const fs = require("fs");
const configDir = require("./configDir.js");

const { accountNumber, region } = JSON.parse(
  fs.readFileSync(`${configDir}/aws_account_info.json`)
);

module.exports = { accountNumber, region };
