const { iam } = require("./services");
const generateRoleParams = require("./generateRoleParams");

const createIAMRole = (roleName) => {
  return iam.createRole(generateRoleParams(roleName)).promise();
};

module.exports = createIAMRole;
