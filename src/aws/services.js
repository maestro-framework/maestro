const fs = require("fs");
const homedir = require("os").homedir();
const AWS = require("aws-sdk");
AWS.config.logger = console;

const apiVersion = "latest";
const region = JSON.parse(
  fs.readFileSync(homedir + "/.config/maestro/aws_account_info.json")
).region;

const iam = new AWS.IAM();
const lambda = new AWS.Lambda({ apiVersion, region });
const stepFunctions = new AWS.StepFunctions({ apiVersion, region });

module.exports = { iam, lambda, stepFunctions };
