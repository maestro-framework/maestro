const fs = require("fs");

const configDir = require("../util/configDir");
const selectTemplateIdx = require("../util/selectTemplateIdx");
const beautifyProjectName = require("../util/beautifyProjectName");
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

  let templateNames;
  try {
    templateNames = fs.readdirSync(`${configDir}/templates`);
  } catch {
    console.log(
      `Warning: the directory "${configDir}/templates" doesn't exist.`
    );
    console.log(
      "If you wish to create a project based off of a template," +
        " please run the `maestro get-templates` command and try again."
    );

    createProjectWithoutTemplate(projectName);
    return;
  }

  if (argv.template && templateNames.includes(argv.template)) {
    createProjectFromTemplate(projectName, argv.template);
  } else if (argv.n || argv.template === false) {
    createProjectWithoutTemplate(projectName);
  } else {
    // has structure of [["Example workflow", "example-workflow"], ...]
    const displayTemplateNames = templateNames.map((name) => [
      beautifyProjectName(name),
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
