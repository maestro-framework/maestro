const AWS = require('aws-sdk');
AWS.config.logger = console;

const fs = require('fs');
const iam = new AWS.IAM();
const childProcess = require('child_process');
const region = 'us-east-2';
const accountNumber = '726360710446';
const roleArn = `arn:aws:iam::${accountNumber}:role/lambda_basic_execution`;
const apiVersion = 'latest';
const lambda = new AWS.Lambda({ apiVersion, region });
const zipContents = fs.readFileSync('requester.zip');

const rolePolicy = {
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Principal: {
        Service: 'lambda.amazonaws.com',
      },
      Action: 'sts:AssumeRole',
    },
  ],
};

const attachPolicyParams = {
  PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
  RoleName: 'lambda_basic_execution',
};

const createRoleParams = {
  RoleName: 'lambda_basic_execution',
  AssumeRolePolicyDocument: JSON.stringify(rolePolicy),
};

const createFunctionParams = {
  Code: {
    ZipFile: zipContents,
  },
  FunctionName: 'requester',
  Handler: 'requester.handler',
  Role: roleArn,
  Runtime: 'nodejs12.x',
};

childProcess.execSync('zip requester.zip requester.js');

iam.createRole(createRoleParams).promise()
  .then(() => iam.attachRolePolicy(attachPolicyParams).promise())
  .then(() => lambda.createFunction(createFunctionParams).promise())
  .catch(console.log);
