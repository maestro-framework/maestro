const fs = require("fs");
const { iam } = require("../services");
const workflowName = require("../../util/workflowName");
const replacePlaceholders = require("../../util/replacePlaceholders");

const generateStateMachineParams = async (roleName) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();
  const aslTemplate = fs.readFileSync("definition.asl.json").toString();
  const definition = replacePlaceholders(aslTemplate);

  return {
    definition,
    name: workflowName,
    roleArn: role.Role.Arn,
  };
};

module.exports = generateStateMachineParams;
