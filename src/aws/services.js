const AWS = require("aws-sdk");
const { region } = require("../util/awsAccountInfo");

const apiVersion = "latest";

AWS.config.logger = console;

const iam = new AWS.IAM();
const lambda = new AWS.Lambda({ apiVersion, region });
const stepFunctions = new AWS.StepFunctions({ apiVersion, region });

module.exports = { iam, lambda, stepFunctions };
