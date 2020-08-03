const childProcess = require("child_process");
const fs = require("fs");

const zipLambdaFileToBuffer = (fileBasename) => {
  return childProcess.execSync(`zip -j - lambdas/${fileBasename}.js`);
};

const getBasenamesAndZipBuffers = () => {
  const fileNames = fs.readdirSync("lambdas");
  const basenames = fileNames.map((filename) => {
    return filename.replace(".js", "");
  });

  return basenames.map((basename) => {
    const zipBuffer = zipLambdaFileToBuffer(basename);
    return { basename, zipBuffer };
  });
};

module.exports = getBasenamesAndZipBuffers;
