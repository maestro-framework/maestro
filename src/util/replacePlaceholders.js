const { accountNumber, region } = require("./awsAccountInfo");
const workflowName = require("./workflowName");

const replacePlaceholders = (aslTemplate) => {
  let definition = aslTemplate;

  definition = definition.replace(/REGION/g, region);
  definition = definition.replace(/ACCOUNT_ID/g, accountNumber);
  definition = definition.replace(/WORKFLOW_NAME/g, workflowName);

  return definition;
};

module.exports = replacePlaceholders;
