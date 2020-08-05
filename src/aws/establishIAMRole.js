const { iam } = require("./services");
const generateRoleParams = require("./generateRoleParams");

const establishIAMRole = async (roleName) => {
  try {
    return await iam.getRole({ RoleName: roleName }).promise();
  } catch(err) {
    console.log(err.message);
    console.log(`Creating a new role called ${roleName}...`);
    return await iam.createRole(generateRoleParams(roleName)).promise();
  } finally {
    console.log(`Successfully established a role called ${roleName}.`);
  }
};

module.exports = establishIAMRole;
