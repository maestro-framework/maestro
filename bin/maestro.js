#!/usr/bin/env node

const minimist = require("minimist");

const argv = minimist(process.argv.slice(2), {
  boolean: ["force", "n"],
  string: ["roles", "template"],
  alias: {
    f: "force",
    t: "template",
  },
  default: {
    roles: "",
  },
});

const defaultMsg = `See man pages for commands:
maestro(1)
maestro-config(1)
maestro-deploy(1)
maestro-teardown(1)
maestro-new(1)
maestro-get-templates(1)`;

switch (argv._[0]) {
  case "config":
    require("../src/commands/config")();
    break;
  case "deploy":
    require("../src/commands/deploy")();
    break;
  case "teardown":
    require("../src/commands/teardown")(argv);
    break;
  case "new":
    require("../src/commands/newProject")(argv);
    break;
  case "get-templates":
    require("../src/commands/getTemplates")();
    break;
  case "help":
    require("../src/commands/help")(argv);
    break;
  default:
    console.log(defaultMsg);
}
