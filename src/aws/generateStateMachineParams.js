const { iam } = require("./services");
const fs = require("fs");
const os = require("os");
const account_info_path = "/.config/maestro/aws_account_info.json";

const readConfigFileFromHome = (path) => {
  const homedir = os.homedir();
  const configFile = JSON.parse(fs.readFileSync(homedir + path));

  return configFile;
};

// TODO: The state machine name is now going to be moved up to the directory
//       having the name of the workflow. This directory represents what will
//       be the project directory in the future. Issue #34
const readStateMachineDefinition = () => {
  const definition = fs
    .readFileSync(`state-machines/${}.asl.json`)
    .toString();

  return definition;
};

const replacePlaceholdersInDefinition = (definition, stateMachineName) => {
  const { region, account_number } = readConfigFileFromHome(account_info_path);
  let modifiedDefinition = definition;

  modifiedDefinition = modifiedDefinition.replace(/REGION/g, region);
  modifiedDefinition = modifiedDefinition.replace(/ACCOUNT_ID/g, account_number);
  // TODO: replace WORKFLOW_NAME (not WORKFLOW_NAME_) with stateMachineName
  //       temporarily only removes the placeholder until the lambdas names
  //       are updated to reflect the name of the workflow
  modifiedDefinition = modifiedDefinition.replace(/WORKFLOW_NAME_/g, '');

  return modifiedDefinition;
};

// TODO: Remove stateMachineName. Per issue #34, we'll now read in the current directory
//       to represent the stateMachineName. Also, the Maestro project README reflects this.
const generateStateMachineParams = async (roleName) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();
  // TODO: readStateMachineName and assign to variable
  const definition = replacePlaceholdersInDefinition(
    readStateMachineDefinition(stateMachineName),
    stateMachineName
  );

  return {
    definition,
    name: stateMachineName,
    roleArn: role.Role.Arn,
  };
};

module.exports = generateStateMachineParams;
