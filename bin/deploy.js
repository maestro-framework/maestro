#!/usr/bin/env node

// TODO: determine how to implement ../lib/util/requireJSON.js
const {
  lambdaPolicyArns,
  statesPolicyArns,
} = require("../lib/config/policy-arn");

const { iam, lambda, stepFunctions } = require("../lib/aws/services");
const retryAsync = require("../lib/util/retryAsync");
const getBasenamesAndZipBuffers = require("../lib/util/getBasenamesAndZipBuffers");
const generateRolePolicy = require("../lib/aws/generateRolePolicy");
const fs = require("fs");
const lambdaRoleName = "lambda_basic_execution";
const statesRoleName = "stepFunctions_basic_execution";
const basenamesAndZipBuffers = getBasenamesAndZipBuffers();

const attachPolicies = (policyArns, roleName) => {
  const attachPolicyPromises = policyArns.map((policyArn) => {
    const policyParams = {
      PolicyArn: policyArn,
      RoleName: roleName,
    };

    return retryAsync(
      () => {
        return iam.attachRolePolicy(policyParams).promise();
      },
      2,
      1000
    );
  });

  return Promise.all(attachPolicyPromises);
};

const createRoleParams = (roleName) => {
  const service = roleName.startsWith("lambda") ? "lambda" : "states";
  return {
    RoleName: roleName,
    AssumeRolePolicyDocument: JSON.stringify(generateRolePolicy(service)),
  };
};

const generateFunctionParams = (basename, zipBuffer, role) => {
  return {
    Code: {
      ZipFile: zipBuffer,
    },
    FunctionName: basename,
    Handler: `${basename}.handler`,
    Role: role.Role.Arn,
    Runtime: "nodejs12.x",
  };
};

const generateMultipleFunctionParams = async (
  basenamesAndZipBuffers,
  roleName
) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();

  return basenamesAndZipBuffers.map(({ basename, zipBuffer }) => {
    return generateFunctionParams(basename, zipBuffer, role);
  });
};

const createLambdaFunctions = (allParams) => {
  const createFunctionPromises = allParams.map((params) =>
    retryAsync(() => lambda.createFunction(params).promise(), 5, 7000, 0.6)
  );

  return Promise.all(createFunctionPromises);
};

const generateStateMachineParams = async (roleName) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();
  const definition = fs
    .readFileSync("state-machines/example-workflow.asl.json")
    .toString();

  return {
    definition,
    name: "example-workflow",
    roleArn: role.Role.Arn,
  };
};

const createStepFunction = (params) => {
  return stepFunctions.createStateMachine(params).promise();
};

iam
  .createRole(createRoleParams(lambdaRoleName))
  .promise()
  .then(() => console.log("Successfully created lambda role"))
  .then(() => attachPolicies(lambdaPolicyArns, lambdaRoleName))
  .then(() => console.log("Successfully attached policies"))
  .then(() =>
    generateMultipleFunctionParams(basenamesAndZipBuffers, lambdaRoleName)
  )
  .then(createLambdaFunctions)
  .then(() => console.log("Successfully created function(s)"));

iam
  .createRole(createRoleParams(statesRoleName))
  .promise()
  .then(() => console.log("Successfully created state machine role"))
  .then(() => attachPolicies(statesPolicyArns, statesRoleName))
  .then(() => console.log("Successfully attached policies"))
  .then(() => generateStateMachineParams(statesRoleName))
  .then(createStepFunction)
  .then(() => console.log("Successfully created state machine"))
  .catch(() => {});
