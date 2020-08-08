const initializeGitRepository = require("../util/initializeGitRepository");
const copyTemplateToDir = require("../util/copyTemplateToDir");
const cleanupAndCapitalize = require("../util/cleanupAndCapitalize");

const createProjectFromTemplate = (projectName, templateName) => {
  const cleanSelectedTemplateName = cleanupAndCapitalize(templateName);

  console.log(
    `Creating project based off of template ${cleanSelectedTemplateName}...`
  );

  copyTemplateToDir(templateName, projectName);
  initializeGitRepository(projectName);

  console.log(`Created project "${projectName}"!`);
};

module.exports = createProjectFromTemplate;
