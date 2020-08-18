const fs = require("fs");
const configDir = require("../util/configDir");
const promptAsync = require("../util/promptAsync");
const obfuscate = require("../util/obfuscate");
const AWSRegions = require("../config/AWSRegions");
const {
  accountNumber: existingAccountNum,
  region: existingRegion,
} = require("../util/awsAccountInfo");

const createHiddenMaestroDir = () => {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }
};

const asyncPromptForValidAccountNumber = async () => {
  const isValidAccountLengthRegex = /\d{12}/;
  let inputAcctNum =
    (await promptAsync(
      "Please enter your AWS Account Number",
      obfuscate(existingAccountNum, 4)
    )) || existingAccountNum;

  while (!isValidAccountLengthRegex.test(inputAcctNum)) {
    console.log("Invalid account number. Must be in format XXXXXXXXXXXX.");
    inputAcctNum =
      (await promptAsync(
        "Please enter your AWS Account Number",
        obfuscate(existingAccountNum, 4)
      )) || existingAccountNum;
  }

  return inputAcctNum;
};

const asyncPromptForValidRegion = async () => {
  let inputRegion =
    (await promptAsync(
      "Please enter the region for your AWS services",
      existingRegion
    )) || existingRegion;

  while (!AWSRegions.includes(inputRegion)) {
    console.log("Invalid region.");
    inputRegion =
      (await promptAsync(
        "Please enter the region for your AWS services",
        existingRegion
      )) || existingRegion;
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
