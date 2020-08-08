const fs = require("fs");

const configDir = require("../util/configDir");
const capitalize = require("../util/capitalize");

const newProject = (argv) => {
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
    const cleanedName = name.replace(/[-_]/,' ');
    return [capitalize(cleanedName), name];
  });

  console.log('Template names:', templateNames);

  console.log(`Created project "${projectName}"!`);
};

module.exports = newProject;
