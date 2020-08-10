const fs = require("fs");
const os = require("os");
const promptAsync = require("../util/promptAsync");

const hiddenMaestroDirPath = () => {
  const homedir = os.homedir();
  const dir = "/.maestro";

  return homedir + dir;
};

const createHiddenMaestroDir = () => {
  const hiddenDirPath = hiddenMaestroDirPath();

  if (!fs.existsSync(hiddenDirPath)) {
    fs.mkdirSync(hiddenDirPath);
  }
};

const asyncPromptForAccountInfo = async () => {
  const accountNum = await promptAsync(
    "Please enter your AWS Account Number: "
  );
  const region = await promptAsync(
    "Please enter the region for you AWS services (e.g. us-west-2): "
  );

  return { account_number: accountNum, region };
};

const writeAccountInfoFile = (accountNumAndRegion) => {
  const accountInfoFilePath = hiddenMaestroDirPath() + "/aws_account_info.json";
  fs.writeFileSync(accountInfoFilePath, JSON.stringify(accountNumAndRegion));
};

const config = async () => {
  const accountNumAndRegion = await asyncPromptForAccountInfo();

  createHiddenMaestroDir();
  writeAccountInfoFile(accountNumAndRegion);
};

module.exports = config;
