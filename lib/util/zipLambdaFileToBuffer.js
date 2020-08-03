const childProcess = require("child_process");

const zipLambdaFileToBuffer = (fileBasename) => {
  return childProcess.execSync(`zip -j - lambdas/${fileBasename}.js`);
};

module.exports = zipLambdaFileToBuffer;
