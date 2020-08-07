const { iam } = require("./services");

const detachPolicies = (policyArns, roleName) => {
  const detachPolicyPromises = policyArns.map((arn) => {
    return iam
      .detachRolePolicy({ PolicyArn: arn, RoleName: roleName })
      .promise();
  });

  return Promise.all(detachPolicyPromises);
};

module.exports = detachPolicies;
