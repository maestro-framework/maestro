const codes = {
  reset:     "\033[m",
  bold:      "\033[1m",
  faint:     "\033[2m",
  italic:    "\033[3m",
  underline: "\033[4m",
  black:     "\033[30m",
  red:       "\033[31m",
  green:     "\033[32m",
  yellow:    "\033[33m",
  blue:      "\033[34m",
  magenta:   "\033[35m",
  cyan:      "\033[36m",
  white:     "\033[37m",
};

const genericHelpMsg  = `Run \`${codes.blue}maestro help${codes.reset} ${codes.italic + codes.underline + codes.red}command${codes.reset}\` to get help specific to a subcommand.`;
const configMsg       = `maestro-config: ${codes.blue + codes.italic}maestro config${codes.reset}
    Set up or alter your Maestro configuration files.

    Run ${codes.blue + codes.italic}maestro config${codes.reset} to set the global config values of AWS account number and
    region.

    See manual page ${codes.yellow + codes.bold}maestro-config(1)${codes.reset} for more information.`;
const deployMsg       = `maestro-deploy: ${codes.blue + codes.italic}maestro deploy${codes.reset}
    Deploy a full AWS Step Functions workflow with AWS Lambdas.

    Run ${codes.blue + codes.italic}maestro deploy${codes.reset} inside a Maestro project to quickly deploy all the
    project's resources including AWS IAM Roles, AWS Lambdas, and the AWS Step
    Functions state machine.

    See manual page ${codes.yellow + codes.bold}maestro-deploy(1)${codes.reset} for more information.`;
const teardownMsg     = `maestro-teardown: ${codes.blue + codes.italic}maestro teardown${codes.reset}
    Teardown an existing Maestro project.

    Run ${codes.blue + codes.italic}maestro teardown${codes.reset} inside a Maestro project to quickly tear down all
    the project's resources including AWS Lambdas, the AWS Step Functions state
    machine, and optionally AWS IAM Roles.

    See manual page ${codes.yellow + codes.bold}maestro-teardown(1)${codes.reset} for more information.`;
const newMsg          = `maestro-new: ${codes.blue + codes.italic}maestro new${codes.reset} ${codes.italic + codes.underline + codes.red}project_name${codes.reset}
    Create a new Maestro project.

    Run ${codes.blue + codes.italic}maestro new${codes.reset} ${codes.italic + codes.underline + codes.red}project_name${codes.reset} to create a new maestro project with the
    given project name.
    When this command is executed a prompt is displayed listing all of the
    available templates on which to base this new project.

    See manual page ${codes.yellow + codes.bold}maestro-new(1)${codes.reset} for more information.`;
const getTemplatesMsg = `"Get templates" help message`;
const helpMsg         = genericHelpMsg;
const defaultMsg      = genericHelpMsg;

const help = (argv) => {
  switch (argv._[1]) {
    case undefined:
      console.log(genericHelpMsg);
      break;
    case "config":
      console.log(configMsg);
      break;
    case "deploy":
      console.log(deployMsg);
      break;
    case "teardown":
      console.log(teardownMsg);
      break;
    case "new":
      console.log(newMsg);
      break;
    case "get-templates":
      console.log(getTemplatesMsg);
      break;
    case "help":
      console.log(helpMsg);
      break;
    default:
      console.log(defaultMsg);
      break;
  }
};

module.exports = help;
