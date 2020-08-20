const fs = require("fs");

const deleteLambdas = require("../aws/lambda/deleteLambdas");
const deleteStateMachine = require("../aws/step-function/deleteStateMachine");
const teardownRoleByName = require("../aws/iam/teardownRoleByName");
const getStateMachineArn = require("../aws/iam/getStateMachineArn");
const basename = require("../util/basename");
const promptAsync = require("../util/promptAsync");
const workflowName = require("../util/workflowName");

const deleteResources = async (rolesToDelete, lambdaNames) => {
  const deleteLambdasPromise = deleteLambdas(lambdaNames).catch(console.log);
  const deleteStateMachinePromise = getStateMachineArn(workflowName)
    .then(deleteStateMachine)
    .catch(console.log);
  await Promise.all([deleteLambdasPromise, deleteStateMachinePromise]);

  rolesToDelete.forEach(teardownRoleByName);
};

const teardown = async (argv) => {
  const lambdaNames = fs
    .readdirSync("lambdas")
    .map(basename)
    .map((lambdaName) => {
      return workflowName + "_" + lambdaName;
    });
  const rolesToDelete = argv.roles.split(",").filter((role) => role.length > 0);

  if (argv.force || argv.f) {
    deleteResources(rolesToDelete, lambdaNames);
  } else {
    const confirmation = (
      await promptAsync(
        `Are you sure you want to delete ${workflowName}?`,
        "y",
        "N"
      )
    ).toLowerCase();

    if (confirmation === "y" || confirmation === "yes") {
      deleteResources(rolesToDelete, lambdaNames);
    } else {
      console.log("Aborting...");
    }
  }
};

module.exports = teardown;
