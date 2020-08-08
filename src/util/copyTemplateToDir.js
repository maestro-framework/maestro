const childProcess = require("child_process");
const configDir = require("../util/configDir");

const copyTemplateToDir = (templateName, dirname) => {
  childProcess.execSync(`cp -r ${configDir}/templates/${templateName}/* ${dirname}`);
};

module.exports = copyTemplateToDir;
