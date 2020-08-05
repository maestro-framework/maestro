#!/usr/bin/env node

const fs = require("fs");
const childProcess = require("child_process");
const minimist = require('minimist');

const retryAsync = require("../src/util/retryAsync");
const { lambdaRoleName, statesRoleName } = require("../src/config/roleNames");
const { iam, lambda, stepFunctions } = require("../src/aws/services");
const deleteLambdas = require("../src/aws/deleteLambdas");
const deleteStateMachine = require("../src/aws/deleteStateMachine");
const getAttachedPolicyArnsByRoleName = require("../src/aws/getAttachedPolicyArnsByRoleName");
const deleteRole = require("../src/aws/deleteRole");
const detachPolicies = require("../src/aws/detachPolicies");
const getStateMachineArn = require("../src/aws/getStateMachineArn");
const basename = require("../src/util/basename");
const promptAsyncYesNoAndExec = require("../src/util/promptAsyncYesNoAndExec");

const argv = minimist(process.argv.slice(2), {
  boolean: ["f", "force"],
  string: ["roles"],
  default: {
    roles: "",
  },
});
const stateMachineName = argv._[0];
const rolesToDelete = argv.roles.split(',').filter((role) => role.length > 0);

if (!stateMachineName) {
  throw new Error("State machine name needs to be provided");
}

// TODO: Specify Lambdas prepended by a given workflow name to delete
const lambdaNames = fs.readdirSync("lambdas").map(basename);

// const deleteRoleByName = require("../src/aws/deleteRoleByName");
const deleteRoleByName = async (name) => {
  const policyArns = await getAttachedPolicyArnsByRoleName(name);
  await detachPolicies(policyArns, name);
  await deleteRole(name);
};

const main = async () => {
  const deleteLambdasPromise = deleteLambdas(lambdaNames).catch(console.log);
  const deleteStateMachinePromise = getStateMachineArn(stateMachineName).then(deleteStateMachine).catch(console.log);
  await Promise.all([deleteLambdasPromise, deleteStateMachinePromise]);

  rolesToDelete.forEach(deleteRoleByName);
};

if (argv.force || argv.f) {
  main();
} else {
  promptAsyncYesNoAndExec(`Are you sure you want to delete ${stateMachineName}?`, main);
}
