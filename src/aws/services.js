const AWS = require("aws-sdk");
const { region } = require("../util/awsAccountInfo");
const { log } = require("../util/log");

const apiVersion = "latest";

AWS.config.logger = log;

const iam = new AWS.IAM();
const lambda = new AWS.Lambda({ apiVersion, region });
const stepFunctions = new AWS.StepFunctions({ apiVersion, region });

module.exports = { iam, lambda, stepFunctions };
