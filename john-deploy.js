const AWS = require("aws-sdk");
const fs = require("fs");
const childProcess = require("child_process");

AWS.config.logger = console;

const region = "us-east-2";
const iam = new AWS.IAM();
const lambda = new AWS.Lambda({ region });
const lambdaName = "manager";
const lambdaRoleName = "exampleWorkflowLambdaRole";
const lambdaRolePolicyDocument = fs
  .readFileSync("roles/exampleWorkflowLambdaRolePolicyDocument.json")
  .toString();

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

sleep(1000) // promise

async function main() {
  await createRole();

  await sleep(1000);
  await attachPolicies();

  zipLambda();

  const roleArn = (await iam.getRole({ RoleName: lambdaRoleName }).promise()).Role.Arn;
  await sleep(8000);
  await createLambda(roleArn);
}

async function createRole() {
  try {
    await iam
      .createRole({
        RoleName: lambdaRoleName,
        AssumeRolePolicyDocument: lambdaRolePolicyDocument,
      })
      .promise();
  } catch {}
}

async function attachPolicies() {
  try {
    await iam
      .attachRolePolicy({
        RoleName: lambdaRoleName,
        PolicyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaRole",
      })
      .promise();

    await iam
      .attachRolePolicy({
        RoleName: lambdaRoleName,
        PolicyArn:
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
      })
      .promise();
  } catch {}
}

function zipLambda() {
  childProcess.execSync(
    `zip lambdas/${lambdaName}.zip lambdas/${lambdaName}.js`
  );
}

async function createLambda(roleArn) {
  await lambda
    .createFunction({
      Code: {
        ZipFile: fs.readFileSync(`lambdas/${lambdaName}.zip`),
      },
      FunctionName: lambdaName,
      Handler: `${lambdaName}.handler`,
      Role: roleArn,
      Runtime: "nodejs12.x",
    })
    .promise();
}

main();
