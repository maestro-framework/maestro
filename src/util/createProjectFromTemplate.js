const initializeGitRepository = require("../util/initializeGitRepository");
const copyTemplateToDir = require("../util/copyTemplateToDir");
const capitalize = require("../util/capitalize");
const cleanupProjectName = require("../util/cleanupProjectName");

const createProjectFromTemplate = (projectName, templateName) => {
  const cleanSelectedTemplateName = capitalize(cleanupProjectName(templateName));

  console.log(
    `Creating project based off of template ${cleanSelectedTemplateName}...`
  );

  copyTemplateToDir(templateName, projectName);
  initializeGitRepository(projectName);

  console.log(`Created project "${projectName}"!`);
};

module.exports = createProjectFromTemplate;
