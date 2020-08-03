#!/usr/bin/env node

const AWS = require("aws-sdk");
const sleep = require('../lib/util/sleep');
AWS.config.logger = console;

const fs = require("fs");
const childProcess = require("child_process");
const iam = new AWS.IAM();
const region = "us-west-2";
const lambdaRoleName = "lambda_basic_execution";
const statesRoleName = "stepFunctions_basic_execution";
const apiVersion = "latest";
const lambda = new AWS.Lambda({ apiVersion, region });
const stepFunctions = new AWS.StepFunctions({ apiVersion, region });

const lambdaPolicyArns = [
  "arn:aws:iam::aws:policy/service-role/AWSLambdaRole",
  "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
];

const statesPolicyArns = [
  "arn:aws:iam::aws:policy/service-role/AWSLambdaRole",
  "arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess",
];

// Extract zipping function files to a helper
const zipFileToBuffer = (fileBasename) => {
  return childProcess.execSync(`zip -j - lambdas/${fileBasename}.js`);
};

// Create a function to read all files in 'lambdas' directory
const getBasenamesAndZipBuffers = () => {
  const fileNames = fs.readdirSync("lambdas");
  const basenames = fileNames.map((filename) => {
    return filename.replace(".js", "");
  });

  return basenames.map((basename) => {
    const zipBuffer = zipFileToBuffer(basename);
    return { basename, zipBuffer };
  });
};

const basenamesAndZipBuffers = getBasenamesAndZipBuffers();

const getRolePolicy = (service) => {
  return {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: `${service}.amazonaws.com`,
        },
        Action: "sts:AssumeRole",
      },
    ],
  };
};

async function retryAsync(
  promiseCallback,
  maxAttempts = 3,
  interval = 2000,
  backoffRate = 3
) {
  try {
    await promiseCallback();
  } catch (err) {
    // base case
    if (maxAttempts <= 1) {
      throw err;
    }

    console.log("Unsuccessful operation. Retrying...");

    await sleep(interval);
    await retryAsync(
      promiseCallback,
      maxAttempts - 1,
      interval * backoffRate,
      backoffRate
    );
  }
}

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
    AssumeRolePolicyDocument: JSON.stringify(getRolePolicy(service)),
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
  const definition = fs.readFileSync(
    "state-machines/example-workflow.asl.json"
  ).toString();

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
  .then(() => console.log("\nSuccessfully created lambda role\n"))
  .then(() => attachPolicies(lambdaPolicyArns, lambdaRoleName))
  .then(() => console.log("\nSuccessfully attached policies\n"))
  .then(() =>
    generateMultipleFunctionParams(basenamesAndZipBuffers, lambdaRoleName)
  )
  .then(createLambdaFunctions)
  .then(() => console.log("\nSuccessfully created function(s)\n"));

iam
  .createRole(createRoleParams(statesRoleName))
  .promise()
  .then(() => console.log("\nSuccessfully created state machine role\n"))
  .then(() => attachPolicies(statesPolicyArns, statesRoleName))
  .then(() => console.log("\nSuccessfully attached policies\n"))
  .then(() => generateStateMachineParams(statesRoleName))
  .then(createStepFunction)
  .then(() => console.log("\nSuccessfully created state machine\n"))
  .catch(() => {});
