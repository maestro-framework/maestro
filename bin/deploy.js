#!/usr/bin/env node

// TODO: determine how to implement ../src/util/requireJSON.js
const {
  lambdaPolicyArns,
  statesPolicyArns,
} = require("../src/config/policy-arn");

const { iam, stepFunctions } = require("../src/aws/services");
const getBasenamesAndZipBuffers = require("../src/util/getBasenamesAndZipBuffers");
const attachPolicies = require("../src/aws/attachPolicies");
const generateRoleParams = require('../src/aws/generateRoleParams');
const generateMultipleFunctionParams = require('../src/aws/generateMultipleFunctionParams');
const generateStateMachineParams = require('../src/aws/generateStateMachineParams');
const createLambdaFunctions = require('../src/aws/createLambdaFunctions');
const lambdaRoleName = "lambda_basic_execution";
const statesRoleName = "stepFunctions_basic_execution";
const basenamesAndZipBuffers = getBasenamesAndZipBuffers();
const stateMachineName = 'example-workflow';

const createStepFunction = (params) => {
  return stepFunctions.createStateMachine(params).promise();
};

iam
  .createRole(generateRoleParams(lambdaRoleName))
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
  .createRole(generateRoleParams(statesRoleName))
  .promise()
  .then(() => console.log("Successfully created state machine role"))
  .then(() => attachPolicies(statesPolicyArns, statesRoleName))
  .then(() => console.log("Successfully attached policies"))
  .then(() => generateStateMachineParams(statesRoleName, stateMachineName))
  .then(createStepFunction)
  .then(() => console.log("Successfully created state machine"))
  .catch(() => {});
