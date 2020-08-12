const fs = require("fs");

const deleteLambdas = require("../aws/lambda/deleteLambdas");
const deleteStateMachine = require("../aws/step-function/deleteStateMachine");
const teardownRoleByName = require("../aws/iam/teardownRoleByName");
const getStateMachineArn = require("../aws/iam/getStateMachineArn");
const basename = require("../util/basename");
const promptAsyncYesNoAndExec = require("../util/promptAsyncYesNoAndExec");
const stateMachineName = require("../util/workflowName");

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
