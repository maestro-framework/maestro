const childProcess = require("child_process");
const fs = require("fs");

const configDir = require("../util/configDir");
const capitalize = require("../util/capitalize");
const initializeGitRepository = require("../util/initializeGitRepository");
const copyTemplateToDir = require("../util/copyTemplateToDir");
const selectTemplateIdx = require("../util/selectTemplateIdx");
const createEmptyProject = require("../util/createEmptyProject");

const cleanupAndCapitalize = (str) => {
  const cleaned = str.replace(/[-_]/g, " ");
  return capitalize(cleaned);
};

const newProject = async (argv) => {
  const projectName = argv._[1];

  if (!projectName) {
    console.log("Please provide a project name");
    return;
  }

  try {
    fs.mkdirSync(projectName);
  } catch {
    console.log(
      `Can't create project with name "${projectName}": directory with same name already exists!`
    );
    return;
  }

  const templateNames = fs.readdirSync(`${configDir}/templates`);

  if (argv.template && templateNames.includes(argv.template)) {
    const cleanSelectedTemplateName = cleanupAndCapitalize(argv.template);

    console.log(
      `Creating project based off of template ${cleanSelectedTemplateName}...`
    );

    copyTemplateToDir(argv.template, projectName);
    initializeGitRepository(projectName);

    console.log(`Created project "${projectName}"!`);
  } else if (argv.n || argv.template === false) {
    console.log("Creating project without template...");

    createEmptyProject(projectName);
    initializeGitRepository(projectName);

    console.log(`Created project "${projectName}"!`);
  } else {
    const displayTemplateNames = templateNames.map((name) => {
      // has structure of [["Example workflow", "example-workflow"], ...]
      return [cleanupAndCapitalize(name), name];
    });

    const selectedTemplateIdx = await selectTemplateIdx(displayTemplateNames);
    let selectedTemplate;

    if (selectedTemplateIdx !== -1) {
      const cleanSelectedTemplateName = templateNames[selectedTemplateIdx][0];
      selectedTemplate = templateNames[selectedTemplateIdx][1];

      console.log(
        `Creating project based off of template ${cleanSelectedTemplateName}...`
      );

      copyTemplateToDir(selectedTemplate, projectName);
    } else {
      console.log("Creating project without template...");

      createEmptyProject(projectName);
    }

    initializeGitRepository(projectName);

    console.log(`Created project "${projectName}"!`);
  }
};

module.exports = newProject;
