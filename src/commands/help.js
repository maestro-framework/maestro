const genericHelpMsg  = "\"Generic help\" help message";
const configMsg       = "\"Config\" help message";
const deployMsg       = "\"Deploy\" help message";
const teardownMsg     = "\"Teardown\" help message";
const newMsg          = "\"New\" help message";
const getTemplatesMsg = "\"Get templates\" help message";
const helpMsg         = "\"Help\" help message";
const defaultMsg      = "\"Default\" help message";

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
