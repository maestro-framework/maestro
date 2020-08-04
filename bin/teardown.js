#!/usr/bin/env node

const fs = require("fs");
const childProcess = require("child_process");

const retryAsync = require("../src/util/retryAsync");
const { lambdaRoleName, statesRoleName } = require("../src/config/roleNames");
const { lambdaPolicyArns, statesPolicyArns } = require("../src/config/policy-arn");
const { iam, lambda, stepFunctions } = require("../src/aws/services");
const deleteLambdas = require("../src/aws/deleteLambdas");
const deleteStateMachine = require("../src/aws/deleteStateMachine");
const detachPolicies = require("../src/aws/detachPolicies");
const getStateMachineArn = require("../src/aws/getStateMachineArn");
const basename = require("../src/util/basename");

const stateMachineName = process.argv[2];
// TODO: Specify Lambdas prepended by a given workflow name to delete
const lambdaNames = fs.readdirSync("lambdas").map(basename);

if (!stateMachineName) {
  throw new Error("State machine name needs to be provided");
}

// extract
const deleteRole = (name) => {
  return iam.deleteRole({ RoleName: name }).promise();
};

deleteLambdas(lambdaNames)
  .catch(console.log)
  .then(() => detachPolicies(lambdaPolicyArns, lambdaRoleName))
  .then(() => retryAsync(() => deleteRole(lambdaRoleName), 5, 7000, .6))

getStateMachineArn(stateMachineName)
  .catch(console.log)
  .then(deleteStateMachine)
  .then(() => detachPolicies(statesPolicyArns, statesRoleName))
  .then(() => retryAsync(() => deleteRole(statesRoleName), 5, 7000, .6))
