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

const getAcctNum = async () => {
  const promptMsg = "Please enter your AWS Account Number";

  if (existingAccountNum) {
    return await promptAsync(promptMsg, obfuscate(existingAccountNum, 4));
  } else {
    return await promptAsync(promptMsg);
  }
};

const asyncPromptForValidAccountNumber = async () => {
  const isValidAccountLengthRegex = /\d{12}/;
  let inputAcctNum = await getAcctNum();

  while (!isValidAccountLengthRegex.test(inputAcctNum)) {
    console.log("Invalid account number. Must be in format XXXXXXXXXXXX.");
    inputAcctNum = await getAcctNum();
  }

  return inputAcctNum;
};

const getRegion = async () => {
  const promptMsg = "Please enter the region for your AWS services";

  if (existingRegion) {
    return await promptAsync(promptMsg, existingRegion);
  } else {
    return await promptAsync(promptMsg);
  }
};

const asyncPromptForValidRegion = async () => {
  let inputRegion = await getRegion();

  while (!AWSRegions.includes(inputRegion)) {
    console.log("Invalid region.");
    inputRegion = await getRegion();
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
