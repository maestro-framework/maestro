const { iam } = require("./services");
const { lambdaPolicyArns, statesPolicyArns } = require("../config/policy-arn");
const sleep = require("../util/sleep");
const retryAsync = require("../util/retryAsync");
const generateRoleParams = require("./generateRoleParams");

const attachPolicies = (policyArns, roleName) => {
  const attachPolicyPromises = policyArns.map((policyArn) => {
    const policyParams = {
      PolicyArn: policyArn,
      RoleName: roleName,
    };

    return retryAsync(
      () => {
        return iam.attachRolePolicy(policyParams).promise();
      },
      2,
      1000
    );
  });

  return Promise.all(attachPolicyPromises);
};

module.exports = attachPolicies;

const establishIAMRole = async (roleName) => {
  const policyArns = roleName.includes("lambda")
    ? lambdaPolicyArns
    : statesPolicyArns;

  try {
    return await iam.getRole({ RoleName: roleName }).promise();
  } catch (err) {
    console.log(err.message);
    console.log(`Creating a new role called ${roleName}...`);
    return await iam
      .createRole(generateRoleParams(roleName))
      .promise()
      .then(() => sleep(7000))
      .then(() => attachPolicies(policyArns, roleName))
      .then(() => console.log("Successfully attached policies"));
  } finally {
    console.log(`Successfully established a role called ${roleName}.`);
  }
};

module.exports = establishIAMRole;
