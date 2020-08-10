const fs = require("fs");
const homedir = require("os").homedir();
const AWS = require("aws-sdk");
const awsAcccountInfoDir = "/.maestro/aws_account_info.json";
AWS.config.logger = console;

const apiVersion = "latest";
let region;

if (fs.existsSync(homedir + awsAcccountInfoDir)) {
  region = JSON.parse(fs.readFileSync(homedir + awsAcccountInfoDir)).region;
}

const iam = new AWS.IAM();
const lambda = new AWS.Lambda({ apiVersion, region });
const stepFunctions = new AWS.StepFunctions({ apiVersion, region });

module.exports = { iam, lambda, stepFunctions };
