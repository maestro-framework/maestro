# Maestro #

Maestro is a framework to manage and deploy workflows. There is a deployer (`deploy.js`) which is an automatic deployer script
that will deploy AWS IAM Roles, AWS Lambdas, and AWS Step Functions to create a functioning state machine.

In the `bin` directory lie `deploy.js` and `teardown.js`. `deploy.js` command takes an argument when invoked from the command line specifying the workflow to deploy; `example-workflow` is deployed if a workflow name is not provided as an argument. Likewise, `teardown.js` can be invoked with a workflow name to teardown and will throw an error if one is not provided.

## Usage ##

To use, you must have the [AWS CLI][aws-cli] installed and set up.

1. Clone this repository (`git clone https://github.com/maestro-framework/maestro.git`)
2. Change directory into the newly cloned repo (`cd maestro`)
3. Install npm packages (`npm install`)
4. Place all lambda files (directories not supported yet) into the `lambdas` directory
5. Place state machine definition(s) into the `state-machines` directory
6. Edit `src/aws/services.js` to modify the region for deployment. The region for deployment is hard coded to `us-west-2` and will be extracted to a config file in the future.
7. Run `deploy.js`, along with the name of the workflow (`bin/deploy.js example-workflow`) to deploy
8. To tear down state machine and associated resources, run the teardown script with the name of the workflow (`bin/teardown.js example-workflow`)
   - This prompts you for confirmation. If you prefer to run it without a confirmation, provide a `-f` or `--force` flag
   - This doesn't tear down the roles that were created by `deploy.js`. To do that, provide a `--roles` flag with a comma-separated-list of role names to tear down (for example, `--roles=roleName1,roleName2` OR `--roles roleName1,roleName2`)

## Dependencies ##

- Node.js 12.x or greater
- `npm`
- `zip` command line utility
- [AWS CLI][aws-cli]

[aws-cli]: https://aws.amazon.com/cli/
