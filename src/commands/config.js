const fs = require('fs');
const os = require('os');
const promptAsync = require('../util/promptAsync');

const createHiddenMaestroDir = () => {
  const homedir = os.homedir();
  const dir = '/.maestro';

  if (!fs.existsSync(homedir + dir)){
      fs.mkdirSync(homedir + dir);
  }
};

const asyncPromptForAccountInfo = async () => {
  // Prompt the user for account info and region
  const accountNum = await promptAsync('Please enter your AWS Account Number: ');
  const region = await promptAsync('Please enter the region for you AWS servises (e.g. us-west-2): ');

  return { accountNum, region };
}

const config = async () => {
  createHiddenMaestroDir();
  const accountNumAndRegion = await asyncPromptForAccountInfo();
  
  // JSON.stringify(accountNumAndRegion);
};


module.exports = config;