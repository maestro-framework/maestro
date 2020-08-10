const initializeGitRepository = require("./initializeGitRepository");
const copyTemplateToDir = require("./copyTemplateToDir");
const capitalize = require("./capitalize");
const cleanupProjectName = require("./cleanupProjectName");

const createProjectFromTemplate = (projectName, templateName) => {
  const cleanSelectedTemplateName = capitalize(
    cleanupProjectName(templateName)
  );

  console.log(
    `Creating project based off of template ${cleanSelectedTemplateName}...`
  );

  copyTemplateToDir(templateName, projectName);
  initializeGitRepository(projectName);

  console.log(`Created project "${projectName}"!`);
};

module.exports = createProjectFromTemplate;
