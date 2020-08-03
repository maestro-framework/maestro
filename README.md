# Example Workflow Deployer #

The example workflow deployer (`deploy.js`) is an automatic deployer script
that will deploy AWS IAM Roles, AWS Lambdas, and AWS Step Functions to create
a functioning state machine.

In the root directory lies `deploy.js` and `undeploy.js`. `deploy.js` reads
all of the files in `lambdas` and `state-machines` directories, which hold the
code for the AWS Lambdas and the state machine definitions, respectively.

To use, you must have the aws cli installed and set up.
