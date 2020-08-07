const { iam } = require("../services");

const deleteRole = (name) => {
  return iam.deleteRole({ RoleName: name }).promise();
};

module.exports = deleteRole;
