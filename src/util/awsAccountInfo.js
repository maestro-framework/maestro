const fs = require("fs");
const configDir = require("./configDir.js");
const hiddenAccountFilePath = `${configDir}aws_account_info.json`;

let accountNumber;
let region;

if (fs.existsSync(hiddenAccountFilePath)) {
  ({ accountNumber, region } = JSON.parse(
    fs.readFileSync(hiddenAccountFilePath)
  ));
}

module.exports = { accountNumber, region };
