const { iam } = require("./services");
const generateRoleParams = require("./generateRoleParams");

const establishIAMRole = async (roleName) => {
  try {
    return await iam.getRole({ RoleName: roleName }).promise();
  } catch {
    return await iam.createRole(generateRoleParams(roleName)).promise();
  }
};

module.exports = establishIAMRole;
