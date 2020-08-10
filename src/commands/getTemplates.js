const fs = require("fs");
const os = require("os");
const childProcess = require("child_process");

const repo = "https://github.com/maestro-framework/maestro-templates";
const templatesDir = `${os.homedir()}/.maestro/templates`;
const alreadyExistsMsg = `The default Maestro templates already exist at ${templatesDir}`;
const creationMsg = `The default Maestro templates have been created at ${templatesDir}`;

const areTemplatesExisting = () => {
  return fs.existsSync(templatesDir);
};

const downloadTemplates = () => {
  const temporaryDir = fs.mkdtempSync("tmp");

  childProcess.execSync(`mkdir ${templatesDir}`);
  childProcess.execSync(`git clone -q ${repo} ${temporaryDir}`);
  childProcess.execSync(`mv ${temporaryDir}/templates/* ${templatesDir}`);
  childProcess.execSync(`rm -rf ${temporaryDir}`);
};

const getTemplates = () => {
  if (areTemplatesExisting()) {
    console.log(alreadyExistsMsg);
  } else {
    downloadTemplates();
    console.log(creationMsg);
  }
};

module.exports = getTemplates;
