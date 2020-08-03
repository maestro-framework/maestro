# Example Workflow Deployer #

The example workflow deployer (`deploy.js`) is an automatic deployer script
that will deploy AWS IAM Roles, AWS Lambdas, and AWS Step Functions to create
a functioning state machine.

In the root directory lies `deploy.js` and `undeploy.js`. `deploy.js` reads
all of the files in `lambdas` and `state-machines` directories, which hold the
code for the AWS Lambdas and the state machine definitions, respectively.

## Usage ##

To use, you must have the [AWS CLI][aws-cli] installed and set up.

1. Clone this repository (`git clone https://github.com/maestro-team/example-workflow-deployer.git`)
2. Change directories into the newly cloned repo (`cd example-workflow-deployer`)
3. Install NPM packages (`npm install`)
3. Place all lambda files (directories not supported yet) into the `lambdas` directory
4. Place state machine definition(s) into the `state-machines` directory
5. Edit `deploy.js` and `undeploy.js`, changing the `region` variable to suit your needs
6. Run `deploy.js` (`node deploy.js`) to deploy
7. To tear down state machine and associated resources, run the undeploy script (`node undeploy.js`)

[aws-cli]: https://aws.amazon.com/cli/
