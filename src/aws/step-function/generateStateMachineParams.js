const aslValidator = require("asl-validator");
const fs = require("fs");
const { iam } = require("../services");
const workflowName = require("../../util/workflowName");
const replacePlaceholders = require("../../util/replacePlaceholders");

const generateStateMachineParams = async (roleName) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();
  const aslTemplate = fs.readFileSync("definition.asl.json").toString();
  const definition = replacePlaceholders(aslTemplate);
  const { isValid, errorsText } = aslValidator(JSON.parse(definition));

  if (isValid) {
    return {
      definition,
      name: workflowName,
      roleArn: role.Role.Arn,
    };
  } else {
    console.error("✕ State machine definition is invalid:", errorsText("\n"));
    return;
  }
};

module.exports = generateStateMachineParams;
