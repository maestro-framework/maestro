# [![Maestro full logo with text](https://user-images.githubusercontent.com/42946880/91614803-739b7200-e93f-11ea-85aa-32f5fbb5f150.png)][github]

[![shields.io npm version badge](https://img.shields.io/npm/v/maestro)][npm]
[![shields.io npm license badge](https://img.shields.io/npm/l/maestro)][npm]
[![shields.io github closed pull requests badge](https://img.shields.io/github/issues-pr-closed/maestro-framework/maestro)][pull-requests]
[![shields.io custom website link badge](https://img.shields.io/static/v1?label=website&message=maestro-framework.github.io&color=blue)][website]

Maestro is a framework that enables rapid iteration for serverless orchestration. The rise of serverless architectures and FaaS offerings such as AWS Lambda has revolutionized how companies are developing modern apps. The need for an orchestration layer over these architectures has brought about services such as AWS Step Functions. However, deploying apps that use Step Functions can be tedious and error-prone. Maestro prioritizes speed and developer productivity by automating this process so that the developer’s focus stays on developing their application's business logic. 

## Usage

To use, you must have the [AWS CLI][aws-cli] installed and set up.

1. Install the npm package globally (`sudo npm -g install maestro`)
2. Configure your AWS account number and region with (`maestro config`)
3. Run `maestro get-templates` to get the default project templates provided by Maestro
4. Create a new project with `maestro new`
5. Hack away on your `definition.asl.json` state machine definitino file and the lambdas in the `lambdas/` directory
6. Run `maestro deploy` in the top level directory of your Maestro project to deploy it to AWS
7. To tear down state machine and associated resources, run `maestro teardown`
   - This prompts you for confirmation. If you prefer to run it without a confirmation, provide a `-f` or `--force` flag
   - This doesn't automatically tear down the roles that were created upon deployment. To do that, provide a `--roles` flag with a comma-separated-list of role names to tear down (for example, `--roles=roleName1,roleName2` OR `--roles roleName1,roleName2`)
8. Read the man pages and get up to speed! (`man maestro`)
   i. Alternatively, take advantage of our helpful `maestro help` command! (e.g. `maestro help deploy` or `maestro deploy --help`)

## Dependencies

- Node.js 12.x or greater
- npm packages (installed during `npm install`):
  - `minimist`
  - `aws-sdk`
- `zip` command line utility
- [AWS CLI][aws-cli]
- `git` version control system

[aws-cli]: https://aws.amazon.com/cli/
[npm]: https://www.npmjs.com/package/maestro
[pull-requests]: https://github.com/maestro-framework/maestro/pulls
[website]: https://maestro-framework.github.io/
[github]: https://github.com/maestro-framework/maestro
