const { iam } = require("../services");
const sleep = require("../../util/sleep");
const generateRoleParams = require("./generateRoleParams");
const createIAMRole = require("./createIAMRole");

const establishIAMRole = async (roleName) => {
  try {
    return await iam.getRole({ RoleName: roleName }).promise();
  } catch (error) {
    console.log(error.message);
    console.log(`Creating a new role called ${roleName}...`);
    createIAMRole(roleName);
  } finally {
    console.log(`Successfully established a role called ${roleName}.`);
  }
};

module.exports = establishIAMRole;
