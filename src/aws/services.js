const AWS = require("aws-sdk");
AWS.config.logger = console;
const iam = new AWS.IAM();
const region = "us-west-2";
const apiVersion = "latest";
const lambda = new AWS.Lambda({ apiVersion, region });
const stepFunctions = new AWS.StepFunctions({ apiVersion, region });

module.exports = { iam, lambda, stepFunctions };
