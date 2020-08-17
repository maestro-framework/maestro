const { iam } = require("../services");
const fs = require("fs");
const workflowName = require("../../util/workflowName");
const { accountNumber, region } = require("../../util/awsAccountInfo");

const replacePlaceholders = (definitionTemplate) => {
  let definition = definitionTemplate;

  definition = definition.replace(/REGION/g, region);
  definition = definition.replace(/ACCOUNT_ID/g, accountNumber);
  definition = definition.replace(/WORKFLOW_NAME/g, workflowName);

  return definition;
};

const generateStateMachineParams = async (roleName) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();
  const definition = replacePlaceholders(
    fs.readFileSync("definition.asl.json").toString()
  );

  return {
    definition,
    name: workflowName,
    roleArn: role.Role.Arn,
  };
};

module.exports = generateStateMachineParams;
