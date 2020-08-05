const { iam } = require("./services");
const fs = require("fs");
const os = require("os");
const account_info_path = "/.config/maestro/aws_account_info.json";

const readConfigFileFromHome = (path) => {
  const homedir = os.homedir();
  const configFile = JSON.parse(fs.readFileSync(homedir + path));

  return configFile;
};

const readStateMachineDefinition = (stateMachineName) => {
  const definition = fs
    .readFileSync(`state-machines/${stateMachineName}.asl.json`)
    .toString();

  return definition;
};

const replacePlaceHoldersInStateMachineDefinition = (stateMachineName) => {
  const { region, account_number } = readConfigFileFromHome(account_info_path);
  let definition = readStateMachineDefinition(stateMachineName);

  definition = definition.replaceAll('REGION', region);
  definition = definition.replaceAll('ACCOUNT_NUMBER', account_number);
  definition = definition.replaceAll('WORKFLOW_NAME', stateMachineName);

  return definition;
}

const generateStateMachineParams = async (roleName, stateMachineName) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();
  const definition = readStateMachineDefinition(stateMachineName);

  return {
    definition,
    name: stateMachineName,
    roleArn: role.Role.Arn,
  };
};

module.exports = generateStateMachineParams;
