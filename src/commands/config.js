const fs = require('fs');
const os = require('os');
const promptAsync = require('../util/promptAsync');

const hiddenMaestroDir = () => {
  const homedir = os.homedir();
  const dir = '/.maestro';

  return homedir + dir;
}

const createHiddenMaestroDir = () => {
  const hiddenDir = hiddenMaestroDir();

  if (!fs.existsSync(hiddenDir)){
      fs.mkdirSync(hiddenDir);
  }
};

const asyncPromptForAccountInfo = async () => {
  const accountNum = await promptAsync('Please enter your AWS Account Number: ');
  const region = await promptAsync('Please enter the region for you AWS servises (e.g. us-west-2): ');

  return { accountNum, region };
};

const writeAccountInfoFile = (accountNumAndRegion) => {
  

};

const config = async () => {
  createHiddenMaestroDir();
  const accountNumAndRegion = await asyncPromptForAccountInfo();
  // Create file .maestro/aws_account_info.json
};


module.exports = config;