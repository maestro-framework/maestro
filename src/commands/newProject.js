const childProcess = require("child_process");
const fs = require("fs");

const configDir = require("../util/configDir");
const capitalize = require("../util/capitalize");
const promptAsync = require("../util/promptAsync");
const initializeGitRepository = require("../util/initializeGitRepository");
const copyTemplateToDir = require("../util/copyTemplateToDir");

const selectTemplateIdx = async (templateNames) => {
  console.log('Select a template to base your project off of (defaults to no template)');
  console.log('-----------------------------------------------------------------------');

  templateNames.forEach(([prettyName, rawName], idx) => {
    console.log(`${`[${idx + 1}]`.padStart(5)} ${prettyName} (${rawName})`);
  });

  console.log('-----------------------------------------------------------------------');
  const selectedIdx = Number(await promptAsync(`Select template 1-${templateNames.length}`, 'none')) - 1;

  if (Number.isNaN(selectedIdx) || !templateNames[selectedIdx]) {
    return -1;
  } else {
    return selectedIdx;
  }
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

  // has structure of [["Example workflow", "example-workflow"], ...]
  const templateNames = fs.readdirSync(`${configDir}/templates`).map((name) => {
    const cleanedName = name.replace(/[-_]/g,' ');
    return [capitalize(cleanedName), name];
  });

  const selectedTemplateIdx = await selectTemplateIdx(templateNames);
  let selectedTemplate;

  if (selectedTemplateIdx !== -1) {
    const cleanSelectedTemplateName = templateNames[selectedTemplateIdx][0];
    selectedTemplate = templateNames[selectedTemplateIdx][1];

    console.log(`Creating project based off of template ${cleanSelectedTemplateName}...`);

    copyTemplateToDir(selectedTemplate, projectName);
  } else {
    console.log("Creating project without template...");
  }

  initializeGitRepository(projectName);

  console.log(`Created project "${projectName}"!`);
};

module.exports = newProject;
