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
  // const accountNum = await promptAsync('Please enter your AWS Account Number');
  // const reqion = await promptAsync('Please enter the region for you AWS servises');
}

const config = () => {
  createHiddenMaestroDir();
  // asyncPromptForAccountInfo();
};


module.exports = config;