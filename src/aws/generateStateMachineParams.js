const { iam } = require('./services');
const fs = require("fs");

const generateStateMachineParams = async (roleName, stateMachineName) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();
  const definition = fs
    .readFileSync(`state-machines/${stateMachineName}.asl.json`)
    .toString();

  return {
    definition,
    name: stateMachineName,
    roleArn: role.Role.Arn,
  };
};

module.exports = generateStateMachineParams;
