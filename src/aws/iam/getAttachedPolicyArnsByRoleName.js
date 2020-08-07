const { iam } = require("../services");

const getAttachedPolicyArnsByRoleName = async (name) => {
  const attachedPolicies = (
    await iam.listAttachedRolePolicies({ RoleName: name }).promise()
  ).AttachedPolicies;
  return attachedPolicies.map(({ PolicyArn: arn }) => arn);
};

module.exports = getAttachedPolicyArnsByRoleName;
