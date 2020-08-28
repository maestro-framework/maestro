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

    Run ${codes.blue + codes.italic}maestro config${codes.reset} to set the global config values of AWS account number and region.
    See manual page ${codes.yellow + codes.bold}maestro-config(1)${codes.reset} for more information.`;
const deployMsg       = `"Deploy" help message`;
const teardownMsg     = `"Teardown" help message`;
const newMsg          = `"New" help message`;
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
