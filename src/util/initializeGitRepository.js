const childProcess = require("child_process");

const initializeGitRepository = (dirname) => {
  childProcess.execSync(`git init '${dirname}'`);
};

module.exports = initializeGitRepository;
