const childProcess = require("child_process");
const fs = require("fs");

const configDir = require("../util/configDir");
const capitalize = require("../util/capitalize");
const titleize = require("../util/titleize");
const promptAsync = require("../util/promptAsync");
const initializeGitRepository = require("../util/initializeGitRepository");
const copyTemplateToDir = require("../util/copyTemplateToDir");

const selectTemplateIdx = async (templateNames) => {
  console.log(
    "Select a template to base your project off of (defaults to no template)"
  );
  console.log(
    "-----------------------------------------------------------------------"
  );

  templateNames.forEach(([prettyName, rawName], idx) => {
    console.log(`${`[${idx + 1}]`.padStart(5)} ${prettyName} (${rawName})`);
  });

  console.log(
    "-----------------------------------------------------------------------"
  );
  const selectedIdx =
    Number(
      await promptAsync(`Select template 1-${templateNames.length}`, "none")
    ) - 1;

  if (Number.isNaN(selectedIdx) || !templateNames[selectedIdx]) {
    return -1;
  } else {
    return selectedIdx;
  }
};

const cleanupAndCapitalize = (str) => {
  const cleaned = str.replace(/[-_]/g, " ");
  return capitalize(cleaned);
};

const cleanupAndTitleize = (str) => {
  const cleaned = str.replace(/[-_]/g, " ");
  return titleize(cleaned);
};

const createEmptyProject = (name) => {
  fs.writeFileSync(`${name}/README.md`, `# ${cleanupAndTitleize(name)}\n\n`);
  fs.writeFileSync(`${name}/definition.asl.json`, "{}");
  fs.mkdirSync(`${name}/lambdas`);
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
    return [cleanupAndCapitalize(name), name];
  });

  const selectedTemplateIdx = await selectTemplateIdx(templateNames);
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
};

module.exports = newProject;
