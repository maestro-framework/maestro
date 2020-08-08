const fs = require('fs');
const os = require('os');
const promptAsync = require('../util/promptAsync');

const createHiddenMaestroDir = () => {
  const homedir = os.homedir();
  const dir = '/.maestro';

  if (!fs.existsSync(dir)){
      fs.mkdirSync(homedir + dir);
  }
};

const promptForAccountInfo = async () => {
  const accountNum = await promptAsync('Please enter your AWS Account Number');
  const reqion = await promptAsync('Please enter the region for you AWS servises');

  return { accountNum, region };
}

const config = () => {
  
};


module.exports = config;