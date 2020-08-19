const initializeGitRepository = require("./initializeGitRepository");
const copyTemplateToDir = require("./copyTemplateToDir");
const beautifyProjectName = require("./beautifyProjectName");

const createProjectFromTemplate = (projectName, templateName) => {
  const beautifulName = beautifyProjectName(templateName);

  console.log(`Creating project based off of template "${beautifulName}"...`);

  copyTemplateToDir(templateName, projectName);
  initializeGitRepository(projectName);

  console.log(`Created project "${projectName}"!`);
};

module.exports = createProjectFromTemplate;
