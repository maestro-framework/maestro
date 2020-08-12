# Maestro

Maestro is a framework to manage and deploy workflows. There is a deployer (`deploy.js`) which is an automatic deployer script
that will deploy AWS IAM Roles, AWS Lambdas, and AWS Step Functions to create a functioning state machine.

In the `bin` directory lie `deploy.js` and `teardown.js`. When `deploy.js` is invoked in a directory that has a `lambdas` subdirectory and `definition.asl.json` state machine definition file, all of the lambdas in that specified directory are deployed, and the `definition.asl.json` file is deployed as well, filling in values as necessary.

In the `templates` directory lie an assortment of template Maestro projects to help you bootstrap your project. When you want to create a project that is based off of a template, first create a directory anywhere in your filesystem with the name of your project (eg `mkdir /path/to/project-name/`). Next, `cd` into that directory. Then `cp` the template files over (eg `cp -r /path/to/maestro/templates/video-transcoding/* .`). After that, you can deploy with `/path/to/maestro/bin/deploy.js` and teardown with `/path/to/maestro/bin/teardown.js`.

## Usage

To use, you must have the [AWS CLI][aws-cli] installed and set up.

1. Clone this repository (`git clone https://github.com/maestro-framework/maestro.git /path/to/maestro`)
2. Install the npm package globally (`sudo npm -g install /path/to/maestro`)
3. Create a new project with `maestro new`
4. Run `maestro config` and follow the prompts
5. Run `maestro deploy` in the top level directory of your Maestro project to deploy it to AWS
6. To tear down state machine and associated resources, run `maestro teardown [-f|--force|--roles=<roles>|--roles <roles>]`
   - This prompts you for confirmation. If you prefer to run it without a confirmation, provide a `-f` or `--force` flag
   - This doesn't automatically tear down the roles that were created upon deployment. To do that, provide a `--roles` flag with a comma-separated-list of role names to tear down (for example, `--roles=roleName1,roleName2` OR `--roles roleName1,roleName2`)
7. Read the man pages and get up to speed! (`man maestro`)

## Dependencies

- Node.js 12.x or greater
- npm packages (installed during `npm install`):
  - `minimist`
  - `aws-sdk`
- `zip` command line utility
- [AWS CLI][aws-cli]
- `git` version control system

## Development Assumptions

- The name of the workflow is the project directory
  - The project directory has to have a `lambdas` subdirectory and a `definition.asl.json` state machine definition template file
- We'll never deploy or teardown from any location that isn't the project root directory (can't deploy from the lambdas directory or any nested)

[aws-cli]: https://aws.amazon.com/cli/
