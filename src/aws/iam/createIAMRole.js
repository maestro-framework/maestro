const { iam } = require("../services");
const sleep = require("../../util/sleep");
const attachPolicies = require("./attachPolicies");
const generateRoleParams = require("./generateRoleParams");

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
