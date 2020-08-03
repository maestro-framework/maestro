const lambdaPolicyArns = [
  "arn:aws:iam::aws:policy/service-role/AWSLambdaRole",
  "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
];

const statesPolicyArns = [
  "arn:aws:iam::aws:policy/service-role/AWSLambdaRole",
  "arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess",
];

module.exports = { lambdaPolicyArns, statesPolicyArns};
