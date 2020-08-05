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

  console.log('Definition: ', definition);

  return definition;
};

const replacePlaceholdersInDefinition = (definition, stateMachineName) => {
  const { region, account_number } = readConfigFileFromHome(account_info_path);

  console.log('Region: ', region);
  console.log('Account Number: ', account_number);

  definition = definition.replace(/REGION/g, region);
  definition = definition.replace(/ACCOUNT_ID/g, account_number);
  definition = definition.replace(/WORKFLOW_NAME/g, stateMachineName);

  return definition;
};

const generateStateMachineParams = async (roleName, stateMachineName) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();
  const definition = replacePlaceholdersInDefinition(
    readStateMachineDefinition(stateMachineName),
    stateMachineName
  );

  console.log("Definition with replacements: ", definition);

  return {
    definition,
    name: stateMachineName,
    roleArn: role.Role.Arn,
  };
};

module.exports = generateStateMachineParams;
