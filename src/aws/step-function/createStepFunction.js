const aslValidator = require("asl-validator");
const { stepFunctions } = require("../services");

const createStepFunction = (params) => {
  const { definition } = params;
  const { isValid, errorsText } = aslValidator(JSON.parse(definition));

  if (isValid) {
    return stepFunctions.createStateMachine(params).promise();
  } else {
    console.error("✕ State machine definition is invalid:", errorsText("\n"));
    throw new Error();
  }
};

module.exports = createStepFunction;
