const { iam } = require("../services");
const fs = require("fs");
const os = require("os");
const accountInfoPath = "/.maestro/aws_account_info.json";
const stateMachineName = require("../../util/workflowName");

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
  const { accountNumber, region } = readConfigFileFromHome(accountInfoPath);
  let modifiedDefinition = definition;

  modifiedDefinition = modifiedDefinition.replace(/REGION/g, region);
  modifiedDefinition = modifiedDefinition.replace(
    /ACCOUNT_ID/g,
    accountNumber
  );

  modifiedDefinition = modifiedDefinition.replace(
    /WORKFLOW_NAME/g,
    stateMachineName
  );

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
