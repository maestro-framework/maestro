#!/usr/bin/env node

// TODO: determine how to implement ../src/util/requireJSON.js
const getBasenamesAndZipBuffers = require("../src/util/getBasenamesAndZipBuffers");
const generateMultipleFunctionParams = require("../src/aws/generateMultipleFunctionParams");
const generateStateMachineParams = require("../src/aws/generateStateMachineParams");
const establishIAMRole = require("../src/aws/establishIAMRole");
const createLambdaFunctions = require("../src/aws/createLambdaFunctions");
const createStepFunction = require("../src/aws/createStepFunction");
// TODO: Separate the retrieving of file basenames and creating zip buffers
//   Specify files to retrieve by a workflow name
const basenamesAndZipBuffers = getBasenamesAndZipBuffers("lambdas");
const { lambdaRoleName, statesRoleName } = require("../src/config/roleNames");
const stateMachineName = process.argv[2] || "example-workflow"; // TODO: perhaps throw an error?

establishIAMRole(lambdaRoleName)
  .then(() =>
    generateMultipleFunctionParams(
      basenamesAndZipBuffers,
      lambdaRoleName,
      stateMachineName
    )
  )
  .then(createLambdaFunctions)
  .then(() => console.log("Successfully created function(s)"));

establishIAMRole(statesRoleName)
  .then(() => generateStateMachineParams(statesRoleName, stateMachineName))
  .then(createStepFunction)
  .then(() => console.log("Successfully created state machine"))
  .catch(() => {});
