const initializeGitRepository = require("../util/initializeGitRepository");
const createEmptyProject = require("../util/createEmptyProject");

const createProjectWithoutTemplate = (projectName) => {
  console.log("Creating project without template...");

  createEmptyProject(projectName);
  initializeGitRepository(projectName);

  console.log(`Created project "${projectName}"!`);
};

module.exports = createProjectWithoutTemplate;
