#!/usr/bin/env node

const fs = require("fs");

const deleteLambdas = require("../src/aws/deleteLambdas");
const deleteStateMachine = require("../src/aws/deleteStateMachine");
const teardownRoleByName = require("../src/aws/teardownRoleByName");
const getStateMachineArn = require("../src/aws/getStateMachineArn");
const basename = require("../src/util/basename");
const promptAsyncYesNoAndExec = require("../src/util/promptAsyncYesNoAndExec");
const stateMachineName = require("../src/util/workflowName");

const deleteResources = async (rolesToDelete, lambdaNames) => {
  const deleteLambdasPromise = deleteLambdas(lambdaNames).catch(console.log);
  const deleteStateMachinePromise = getStateMachineArn(stateMachineName)
    .then(deleteStateMachine)
    .catch(console.log);
  await Promise.all([deleteLambdasPromise, deleteStateMachinePromise]);

  rolesToDelete.forEach(teardownRoleByName);
};

const teardown = (argv) => {
  const lambdaNames = fs
    .readdirSync("lambdas")
    .map(basename)
    .map((lambdaName) => {
      return stateMachineName + "_" + lambdaName;
    });
  const rolesToDelete = argv.roles.split(",").filter((role) => role.length > 0);

  if (argv.force || argv.f) {
    deleteResources(rolesToDelete, lambdaNames);
  } else {
    promptAsyncYesNoAndExec(
      `Are you sure you want to delete ${stateMachineName}?`,
      () => deleteResources(rolesToDelete, lambdaNames)
    );
  }
};

module.exports = teardown;
