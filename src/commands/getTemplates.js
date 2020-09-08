const fs = require("fs");
const childProcess = require("child_process");
const configDir = require("../util/configDir");

const repo = "https://github.com/maestro-framework/maestro-templates";
const templatesDir = `${configDir}/templates`;
const loadingMsg = "Downloading templates...";
const alreadyExistsMsg = `The default Maestro templates already exist at ${templatesDir}`;
const creationMsg = `The default Maestro templates have been created at ${templatesDir}`;

const areTemplatesExisting = () => {
  return fs.existsSync(templatesDir);
};

const downloadTemplates = () => {
  const temporaryDir = fs.mkdtempSync("tmp");

  childProcess.execSync(`git clone -q '${repo}' '${temporaryDir}'`);
  fs.mkdirSync(templatesDir);

  fs.readdirSync(`${temporaryDir}/templates`).forEach((templateName) => {
    fs.renameSync(
      `${temporaryDir}/templates/${templateName}`,
      `${templatesDir}/${templateName}`
    );
  });

  fs.rmdirSync(temporaryDir, { recursive: true });
};

const getTemplates = () => {
  if (fs.existsSync(configDir)) {
    if (areTemplatesExisting()) {
      console.log(alreadyExistsMsg);
    } else {
      console.log(loadingMsg);
      downloadTemplates();
      console.log(creationMsg);
    }
  } else {
    console.log(
      "Before retrieving templates, first configure Maestro by executing the 'maestro config' command"
    );
  }
};

module.exports = getTemplates;
