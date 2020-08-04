const childProcess = require("child_process");
const basename = require('./basename');
const fs = require("fs");

const zipFileToBuffer = (directory, filename) => {
  return childProcess.execSync(`zip -j - ${directory}/${filename}`);
};

const getBasenamesAndZipBuffers = (directory, workflowName) => {
  // TODO: function that filters the directory by workflowName
  const fileNames = fs.readdirSync(`${directory}`);
  const basenames = fileNames.map(basename);

  return basenames.map((basename, idx) => {
    const zipBuffer = zipFileToBuffer(directory, fileNames[idx]);
    return { basename, zipBuffer };
  });
};

module.exports = getBasenamesAndZipBuffers;
