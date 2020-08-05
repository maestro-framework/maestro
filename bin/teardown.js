#!/usr/bin/env node

const fs = require("fs");
const childProcess = require("child_process");
const minimist = require('minimist');

const retryAsync = require("../src/util/retryAsync");
const { lambdaRoleName, statesRoleName } = require("../src/config/roleNames");
const { lambdaPolicyArns, statesPolicyArns } = require("../src/config/policy-arn");
const { iam, lambda, stepFunctions } = require("../src/aws/services");
const deleteLambdas = require("../src/aws/deleteLambdas");
const deleteStateMachine = require("../src/aws/deleteStateMachine");
const deleteRole = require("../src/aws/deleteRole");
const detachPolicies = require("../src/aws/detachPolicies");
const getStateMachineArn = require("../src/aws/getStateMachineArn");
const basename = require("../src/util/basename");
const promptAsync = require("../src/util/promptAsync");

const argv = minimist(process.argv.slice(2));
const stateMachineName = argv._[0];

// TODO: Specify Lambdas prepended by a given workflow name to delete
const lambdaNames = fs.readdirSync("lambdas").map(basename);

if (!stateMachineName) {
  throw new Error("State machine name needs to be provided");
}

const main = () => {
  deleteLambdas(lambdaNames)
    .catch(console.log)
    .then(() => detachPolicies(lambdaPolicyArns, lambdaRoleName))
    .then(() => retryAsync(() => deleteRole(lambdaRoleName), 5, 7000, .6));

  getStateMachineArn(stateMachineName)
    .catch(console.log)
    .then(deleteStateMachine)
    .then(() => detachPolicies(statesPolicyArns, statesRoleName))
    .then(() => retryAsync(() => deleteRole(statesRoleName), 5, 7000, .6));
};

(async function() {
  switch ((await promptAsync(`Are you sure you want to delete ${stateMachineName}? `)).trim()) {
    case 'y':
    case 'yes':
    case 'Y':
    case 'Yes':
      main();
      break;
    default:
      console.log('Aborting...');
      break;
  }
})();
