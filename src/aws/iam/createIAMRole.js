const { iam } = require("../services");
const attachPolicies = require("./attachPolicies");

const {
  lambdaPolicyArns,
  statesPolicyArns,
} = require("../../config/policy-arn");

const createIAMRole = async (roleName) => {
  const policyArns = roleName.includes("lambda")
    ? lambdaPolicyArns
    : statesPolicyArns;

  return await iam
    .createRole(generateRoleParams(roleName))
    .promise()
    .then(() => sleep(7000))
    .then(() => attachPolicies(policyArns, roleName))
    .then(() => console.log("Successfully attached policies"));
};

module.exports = createIAMRole;
