const { stepFunctions } = require("./services.js");

const getStateMachineArn = async (name) => {
  const stateMachines = (await stepFunctions.listStateMachines().promise())
    .stateMachines;

  return stateMachines.find((stateMachine) => stateMachine.name === name)
    .stateMachineArn;
};

module.exports = getStateMachineArn;
