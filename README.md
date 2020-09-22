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
5. Hack away on your `definition.asl.json` state machine definition file and the lambdas in the `lambdas/` directory
6. Run `maestro deploy` in the top level directory of your Maestro project to deploy it to AWS
7. To tear down state machine and associated resources, run `maestro teardown`
   - This prompts you for confirmation. If you prefer to run it without a confirmation, provide a `-f` or `--force` flag
   - This doesn't automatically tear down the roles that were created upon deployment. To do that, provide a `--roles` flag with a comma-separated-list of role names to tear down (for example, `--roles=roleName1,roleName2` OR `--roles roleName1,roleName2`)
8. Read the man pages and get up to speed! (`man maestro`)
   i. Alternatively, take advantage of our helpful `maestro help` command! (e.g. `maestro help deploy` or `maestro deploy --help`)

## Commands

<table>
  <thead>
    <tr>
      <th>Command</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>maestro&nbsp;new</code>
      </td>
      <td>
        <p>
          This command creates a new Maestro project with the given project
          name. When <code>maestro new</code> is executed, the user is prompted with a
          list of all the templates to base their new project off of. </p>
        <p>
          If the user simply presses <code>&lt;return&gt;</code>at the prompt
          or enters invalid input, the new project is created without the
          influence of a template.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>maestro&nbsp;deploy</code>
      </td>
      <td>
        <p>
          This command must be executed at the root of your Maestro project.
          It will deploy both the state machine as defined in
          <code>definition.asl.json</code> and all lambda functions defined in
          the <code>lambdas/</code> directory. If you do not have the
          necessary Maestro IAM roles, running this command will automatically
          create them for you as part of the deployment.
        </p>
        <p>
          Typical deployment time is a lightning-fast <em>3 seconds</em>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>maestro&nbsp;teardown</code>
      </td>
      <td>
        <p>
          Executing this command with your working directory being the root of
          some Maestro project will tear down the associated resources from
          AWS, which are as follows:
        </p>
        <ul>
          <li>
            All AWS Lambdas uploaded from the project-local
            <code>lambdas/</code> directory.
          </li>
          <li>
            The AWS Step Functions state machine created from the
            project-local<code>definition.asl.json</code> definition file.
          </li>
          <li>
            Any AWS IAM roles specified via an optional flag.
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <code>maestro&nbsp;help</code>
      </td>
      <td>
        <p>
          Display help information about Maestro or a Maestro command.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>maestro&nbsp;config</code>
      </td>
      <td>
        <p>The <code>maestro config</code>command should be the first command
        run after installing Maestro. Any Maestro deployment or teardown
        depends on the account information configured by this command.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <code>maestro&nbsp;get-templates</code>
      </td>
      <td>
        <p>
          Fetches the Maestro default templates from git and installs them on
          the user’s local machine.
        </p>
      </td>
    </tr>
  </tbody>
</table>

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
