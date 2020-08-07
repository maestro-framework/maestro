const { stepFunctions } = require("../services");

const deleteStateMachine = (arn) => {
  return stepFunctions.deleteStateMachine({ stateMachineArn: arn }).promise();
};

module.exports = deleteStateMachine;
