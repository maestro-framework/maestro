const getAttachedPolicyArnsByRoleName = require("./getAttachedPolicyArnsByRoleName");
const detachPolicies = require("./detachPolicies");
const deleteRole = require("./deleteRole");

const teardownRoleByName = async (name) => {
  const policyArns = await getAttachedPolicyArnsByRoleName(name);
  await detachPolicies(policyArns, name);
  await deleteRole(name);
};

module.exports = teardownRoleByName;
