const getBasenamesAndZipBuffers = require("../src/util/getBasenamesAndZipBuffers");
const generateMultipleFunctionParams = require("../src/aws/generateMultipleFunctionParams");
const generateStateMachineParams = require("../src/aws/generateStateMachineParams");
const establishIAMRole = require("../src/aws/establishIAMRole");
const createLambdaFunctions = require("../src/aws/createLambdaFunctions");
const createStepFunction = require("../src/aws/createStepFunction");
// TODO: Separate the retrieving of file basenames and creating zip buffers
//   Specify files to retrieve by a workflow name
const { lambdaRoleName, statesRoleName } = require("../src/config/roleNames");

const deploy = () => {
  const basenamesAndZipBuffers = getBasenamesAndZipBuffers("lambdas");

  establishIAMRole(lambdaRoleName)
    .then(() =>
      generateMultipleFunctionParams(
        basenamesAndZipBuffers,
        lambdaRoleName
      )
    )
    .then(createLambdaFunctions)
    .then(() => console.log("Successfully created function(s)"));

  establishIAMRole(statesRoleName)
    .then(() => generateStateMachineParams(statesRoleName))
    .then(createStepFunction)
    .then(() => console.log("Successfully created state machine"))
    .catch(() => {});
}

module.exports = deploy;
