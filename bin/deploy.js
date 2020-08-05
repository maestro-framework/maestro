#!/usr/bin/env node

// TODO: determine how to implement ../src/util/requireJSON.js
const { lambdaPolicyArns, statesPolicyArns } = require("../src/config/policy-arn");
const getBasenamesAndZipBuffers = require("../src/util/getBasenamesAndZipBuffers");
const sleep = require("../src/util/sleep");
const attachPolicies = require("../src/aws/attachPolicies");
const generateMultipleFunctionParams = require('../src/aws/generateMultipleFunctionParams');
const generateStateMachineParams = require('../src/aws/generateStateMachineParams');
const establishIAMRole = require('../src/aws/establishIAMRole');
const createLambdaFunctions = require('../src/aws/createLambdaFunctions');
const createStepFunction = require('../src/aws/createStepFunction');
// TODO: Separate the retrieving of file basenames and creating zip buffers
//   Specify files to retrieve by a workflow name
const basenamesAndZipBuffers = getBasenamesAndZipBuffers('lambdas');
const { lambdaRoleName, statesRoleName } = require('../src/config/roleNames');
const stateMachineName = process.argv[2] || 'example-workflow'; // TODO: perhaps throw an error?

establishIAMRole(lambdaRoleName)
  .then(() => attachPolicies(lambdaPolicyArns, lambdaRoleName))
  .then(() => console.log("Successfully attached policies"))
  .then(() =>
    generateMultipleFunctionParams(basenamesAndZipBuffers, lambdaRoleName)
  )
  .then(createLambdaFunctions)
  .then(() => console.log("Successfully created function(s)"));

establishIAMRole(statesRoleName)
  .then(() => attachPolicies(statesPolicyArns, statesRoleName))
  .then(() => console.log("Successfully attached policies"))
  .then(() => generateStateMachineParams(statesRoleName, stateMachineName))
  .then(createStepFunction)
  .then(() => console.log("Successfully created state machine"))
  .catch(() => {});
