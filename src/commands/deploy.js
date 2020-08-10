const getBasenamesAndZipBuffers = require("../util/getBasenamesAndZipBuffers");
const generateMultipleFunctionParams = require("../aws/lambda/generateMultipleFunctionParams");
const createLambdaFunctions = require("../aws/lambda/createLambdaFunctions");
const generateStateMachineParams = require("../aws/step-function/generateStateMachineParams");
const createStepFunction = require("../aws/step-function/createStepFunction");
const establishIAMRole = require("../aws/iam/establishIAMRole");
// TODO: Separate the retrieving of file basenames and creating zip buffers
//   Specify files to retrieve by a workflow name
const { lambdaRoleName, statesRoleName } = require("../config/roleNames");

const deploy = () => {
  const basenamesAndZipBuffers = getBasenamesAndZipBuffers("lambdas");

  establishIAMRole(lambdaRoleName)
    .then(() =>
      generateMultipleFunctionParams(basenamesAndZipBuffers, lambdaRoleName)
    )
    .then(createLambdaFunctions)
    .then(() => console.log("Successfully created function(s)"));

  establishIAMRole(statesRoleName)
    .then(() => generateStateMachineParams(statesRoleName))
    .then(createStepFunction)
    .then(() => console.log("Successfully created state machine"))
    .catch(() => {});
};

module.exports = deploy;
