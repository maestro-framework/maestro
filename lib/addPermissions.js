const AWS = require('aws-sdk');
const iam = new AWS.IAM();

const attachPolicyParams = {
  PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
  RoleName: 'lambda_basic_execution',
};

const genericCallback = (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
};

iam.attachRolePolicy(attachPolicyParams, genericCallback);
