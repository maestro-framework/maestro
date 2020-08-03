const { stepFunctions } = require("./services");

const createStepFunction = (params) => {
  return stepFunctions.createStateMachine(params).promise();
};

module.exports = createStepFunction;
