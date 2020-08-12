const generateRolePolicy = require("./generateRolePolicy");

const generateRoleParams = (roleName) => {
  const service = roleName.includes("lambda") ? "lambda" : "states";
  return {
    RoleName: roleName,
    AssumeRolePolicyDocument: JSON.stringify(generateRolePolicy(service)),
  };
};

module.exports = generateRoleParams;
