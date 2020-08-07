const { iam } = require("./services");
const fs = require("fs");
const os = require("os");
const account_info_path = "/.config/maestro/aws_account_info.json";
const stateMachineName = require("../util/workflowName");

const readConfigFileFromHome = (path) => {
  const homedir = os.homedir();
  const configFile = JSON.parse(fs.readFileSync(homedir + path));

  return configFile;
};

const readStateMachineDefinition = () => {
  const definition = fs.readFileSync("definition.asl.json").toString();

  return definition;
};

const replacePlaceholdersInDefinition = (definition) => {
  const { region, account_number } = readConfigFileFromHome(account_info_path);
  let modifiedDefinition = definition;

  modifiedDefinition = modifiedDefinition.replace(/REGION/g, region);
  modifiedDefinition = modifiedDefinition.replace(
    /ACCOUNT_ID/g,
    account_number
  );

  modifiedDefinition = modifiedDefinition.replace(/WORKFLOW_NAME_/g, stateMachineName);

  return modifiedDefinition;
};

const generateStateMachineParams = async (roleName) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();
  const definition = replacePlaceholdersInDefinition(
    readStateMachineDefinition()
  );

  return {
    definition,
    name: stateMachineName,
    roleArn: role.Role.Arn,
  };
};

module.exports = generateStateMachineParams;
