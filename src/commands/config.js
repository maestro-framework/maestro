const fs = require("fs");
const os = require("os");
const configDir = require("../util/configDir");
const promptAsync = require("../util/promptAsync");
const AWSRegions = require("../config/AWSRegions");

// const hiddenMaestroDirPath = () => {
//   const homedir = os.homedir();
//   const dir = "/.maestro";

//   return homedir + dir;
// };

const createHiddenMaestroDir = () => {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }
};

const promptForValidRegion = async () => {
  let inputRegion = 'invalid-region';

  while (!AWSRegions.includes(inputRegion)) {
    inputRegion = await promptAsync(
      "Please enter the region for you AWS services (e.g. us-west-2): "
    );
  }

  return inputRegion;
};

const asyncPromptForAccountInfo = async () => {
  // TODO: add validation for account #
  //    12 digits, no separator
  const accountNumber = await promptAsync(
    "Please enter your AWS Account Number: "
  );
  const region = await promptForValidRegion();

  return { accountNumber, region };
};

const writeAccountInfoFile = (accountNumAndRegion) => {
  const accountInfoFilePath = configDir + "/aws_account_info.json";
  fs.writeFileSync(accountInfoFilePath, JSON.stringify(accountNumAndRegion));
};

const config = async () => {
  const accountNumAndRegion = await asyncPromptForAccountInfo();

  createHiddenMaestroDir();
  writeAccountInfoFile(accountNumAndRegion);
};

module.exports = config;
