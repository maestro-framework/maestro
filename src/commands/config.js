const fs = require("fs");
const os = require("os");
const configDir = require("../util/configDir");
const promptAsync = require("../util/promptAsync");
const AWSRegions = require("../config/AWSRegions");

const createHiddenMaestroDir = () => {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }
};

const asyncPromptForValidAccountNumber = async () => {
  const isValidAccountLengthRegex = /\d{12}/;
  let inputAcctNum = 'invalidAcctNum';

  while(!isValidAccountLengthRegex.test(inputAcctNum)) {
    inputAcctNum = await promptAsync(
      "Please enter your AWS Account Number: "
    );
  }

  return inputAcctNum;
};

const asyncPromptForValidRegion = async () => {
  let inputRegion = 'invalid-region';

  while (!AWSRegions.includes(inputRegion)) {
    inputRegion = await promptAsync(
      "Please enter the region for your AWS services (e.g. us-west-2): "
    );
  }

  return inputRegion;
};

const asyncPromptForAccountInfo = async () => {
  const accountNumber = await asyncPromptForValidAccountNumber();
  const region = await asyncPromptForValidRegion();

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
