/*
Next steps:
1. Attach 2 policies to role
2. Allow deploying all lambdas in lambdas directory
   - After creating zip files and deploying lambdas, should zip files be deleted?
3. Separate different components (iam, lambda, step function) into different files
   - Use `require("./foo.js")` syntax
   - Could be 1 file per component or multiple
*/

const AWS = require("aws-sdk");
AWS.config.logger = console;

const fs = require("fs");
const childProcess = require("child_process");
const iam = new AWS.IAM();
const region = "us-west-2";
const lambdaRoleName = "lambda_basic_execution";
const statesRoleName = "stepFunctions_basic_execution";
const apiVersion = "latest";
const lambda = new AWS.Lambda({ apiVersion, region });
const lambdaPolicyArns = [
  "arn:aws:iam::aws:policy/service-role/AWSLambdaRole",
  "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
];

const statesPolicyArns = [
  "arn:aws:iam::aws:policy/service-role/AWSLambdaRole",
  "arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess",
];

// Extract zipping function files to a helper
const zipFileToBuffer = (fileBasename) => {
  return childProcess.execSync(`zip -j - lambdas/${fileBasename}.js`);
};

// Create a function to read all files in 'lambdas' directory
const getBasenamesAndZipBuffers = () => {
  const fileNames = fs.readdirSync("lambdas");
  const basenames = fileNames.map((filename) => {
    return filename.replace(".js", "");
  });

  return basenames.map((basename) => {
    const zipBuffer = zipFileToBuffer(basename);
    return { basename, zipBuffer };
  });
};

const basenamesAndZipBuffers = getBasenamesAndZipBuffers();

const getRolePolicy = (service) => {
  return {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: `${service}.amazonaws.com`,
        },
        Action: "sts:AssumeRole",
      },
    ],
  };
};

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryAsync(
  promiseCallback,
  maxAttempts = 3,
  interval = 2000,
  backoffRate = 3
) {
  try {
    await promiseCallback();
  } catch (err) {
    // base case
    if (maxAttempts <= 1) {
      throw err;
    }

    console.log("Unsuccessful operation. Retrying...");

    await sleep(interval);
    await retryAsync(
      promiseCallback,
      maxAttempts - 1,
      interval * backoffRate,
      backoffRate
    );
  }
}

const attachPolicies = (policyArns, roleName) => {
  const attachPolicyPromises = policyArns.map((policyArn) => {
    const policyParams = {
      PolicyArn: policyArn,
      RoleName: roleName,
    };

    return retryAsync(
      () => {
        return iam.attachRolePolicy(policyParams).promise();
      },
      2,
      1000
    );
  });

  return Promise.all(attachPolicyPromises);
};

const createRoleParams = (roleName) => {
  const service = roleName.startsWith("lambda") ? "lambda" : "states";
  return {
    RoleName: roleName,
    AssumeRolePolicyDocument: JSON.stringify(getRolePolicy(service)),
  };
};

const generateFunctionParams = (basename, zipBuffer, role) => {
  return {
    Code: {
      ZipFile: zipBuffer,
    },
    FunctionName: basename,
    Handler: `${basename}.handler`,
    Role: role.Role.Arn,
    Runtime: "nodejs12.x",
  };
};

const generateMultipleFunctionParams = async (
  basenamesAndZipBuffers,
  roleName
) => {
  const role = await iam.getRole({ RoleName: roleName }).promise();

  return basenamesAndZipBuffers.map(({ basename, zipBuffer }) => {
    return generateFunctionParams(basename, zipBuffer, role);
  });
};

const createLambdaFunctions = (allParams) => {
  const createFunctionPromises = allParams.map((params) =>
    retryAsync(() => lambda.createFunction(params).promise(), 5, 7000, 0.6)
  );

  return Promise.all(createFunctionPromises);
};

iam
  .createRole(createRoleParams(lambdaRoleName))
  .promise()
  .then(() => console.log("Successfully created role"))
  .then(() => attachPolicies(lambdaPolicyArns, lambdaRoleName))
  .then(() => console.log("Successfully attached policies"))
  .then(() => generateMultipleFunctionParams(basenamesAndZipBuffers, lambdaRoleName))
  .then(createLambdaFunctions)
  .then(() => console.log("Successfully created function(s)"));

iam
  .createRole(createRoleParams(statesRoleName))
  .promise()
  .then(() => console.log("Successfully created role"))
  .then(() => attachPolicies(statesPolicyArns, statesRoleName))
  .then(() => console.log("Successfully attached policies"));
