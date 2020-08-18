const attachPolicies = (policyArns, roleName) => {
  const attachPolicyPromises = policyArns.map((policyArn) => {
    const policyParams = {
      PolicyArn: policyArn,
      RoleName: roleName,
    };

    return iam.attachRolePolicy(policyParams).promise();
  });

  return Promise.all(attachPolicyPromises);
};

module.exports = attachPolicies;
