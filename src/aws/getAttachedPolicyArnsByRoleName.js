const { iam } = require("./services");

const getAttachedPolicyArnsByRoleName = async (name) => {
  return await iam.listAttachedRolePolicies({ RoleName: name }).promise();
};

module.exports = getAttachedPolicyArnsByRoleName;
