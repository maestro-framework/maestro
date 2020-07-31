const AWS = require('aws-sdk');
const fs = require('fs');

const region = 'us-east-2';
const accountNumber = '726360710446';

const roleArn = `arn:aws:iam::${accountNumber}:role/lambda_basic_execution`;
const apiVersion = 'latest';
const lambda = new AWS.Lambda({ apiVersion, region });
const zipContents = fs.readFileSync('requester.zip');

const createFunctionParams = {
  Code: {
    ZipFile: zipContents,
  },
  FunctionName: 'requester',
  Handler: 'requester.handler',
  Role: roleArn,
  Runtime: 'nodejs12.x',
};

lambda.createFunction(createFunctionParams, genericCallback);
