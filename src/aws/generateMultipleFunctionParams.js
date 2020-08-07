const { iam } = require("./services.js");
const stateMachineName = require("../util/workflowName");

const generateFunctionParams = (basename, zipBuffer, role) => {
  return {
    Code: {
      ZipFile: zipBuffer,
    },
    FunctionName: stateMachineName + "_" + basename,
    Handler: `${basename}.handler`,
    Role: role.Role.Arn,
    Runtime: "nodejs12.x",
  };
};

const generateMultipleFunctionParams = async (
  basenamesAndZipBuffers,
  roleName
) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();

  return basenamesAndZipBuffers.map(({ basename, zipBuffer }) => {
    return generateFunctionParams(basename, zipBuffer, role);
  });
};

module.exports = generateMultipleFunctionParams;
