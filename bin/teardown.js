#!/usr/bin/env node

const fs = require("fs");
const minimist = require("minimist");
const childProcess = require("child_process");

const retryAsync = require("../src/util/retryAsync");
const { lambdaRoleName, statesRoleName } = require("../src/config/roleNames");
const {
  lambdaPolicyArns,
  statesPolicyArns,
} = require("../src/config/policy-arn");
const deleteLambdas = require("../src/aws/deleteLambdas");
const deleteStateMachine = require("../src/aws/deleteStateMachine");
const teardownRoleByName = require("../src/aws/teardownRoleByName");
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
const stateMachineName = require("../src/util/workflowName");
const rolesToDelete = argv.roles.split(",").filter((role) => role.length > 0);

// TODO: Specify Lambdas prepended by a given workflow name to delete
const lambdaNames = fs.readdirSync("lambdas").map(basename);

const main = async () => {
  const deleteLambdasPromise = deleteLambdas(lambdaNames).catch(console.log);
  const deleteStateMachinePromise = getStateMachineArn(stateMachineName)
    .then(deleteStateMachine)
    .catch(console.log);
  await Promise.all([deleteLambdasPromise, deleteStateMachinePromise]);

  rolesToDelete.forEach(teardownRoleByName);
};

if (argv.force || argv.f) {
  main();
} else {
  promptAsyncYesNoAndExec(
    `Are you sure you want to delete ${stateMachineName}?`,
    main
  );
}
