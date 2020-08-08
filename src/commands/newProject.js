const childProcess = require("child_process");
const fs = require("fs");

const configDir = require("../util/configDir");
const selectTemplateIdx = require("../util/selectTemplateIdx");
const cleanupAndCapitalize = require("../util/cleanupAndCapitalize");
const createProjectFromTemplate = require("../util/createProjectFromTemplate");
const createProjectWithoutTemplate = require("../util/createProjectWithoutTemplate");

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
    createProjectFromTemplate(projectName, argv.template);
  } else if (argv.n || argv.template === false) {
    createProjectWithoutTemplate(projectName);
  } else {
    // has structure of [["Example workflow", "example-workflow"], ...]
    const displayTemplateNames = templateNames.map((name) => [
      cleanupAndCapitalize(name),
      name,
    ]);

    const selectedTemplateIdx = await selectTemplateIdx(displayTemplateNames);

    if (selectedTemplateIdx !== -1) {
      const selectedTemplate = displayTemplateNames[selectedTemplateIdx][1];
      createProjectFromTemplate(projectName, selectedTemplate);
    } else {
      createProjectWithoutTemplate(projectName);
    }
  }
};

module.exports = newProject;
