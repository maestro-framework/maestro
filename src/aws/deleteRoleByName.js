const getAttachedPolicyArnsByRoleName = require("./getAttachedPolicyArnsByRoleName");
const detachPolicies = require("./detachPolicies");
const deleteRole = require("./deleteRole");

const deleteRoleByName = async (name) => {
  const policyArns = await getAttachedPolicyArnsByRoleName(name);
  await detachPolicies(policyArns, name);
  await deleteRole(name);
};

module.exports = deleteRoleByName;
