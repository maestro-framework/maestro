#!/usr/bin/env node

const minimist = require("minimist");

const argv = minimist(process.argv.slice(2), {
  boolean: ["force", "n", "help"],
  string: ["roles", "template"],
  alias: {
    f: "force",
    t: "template",
    h: "help",
  },
  default: {
    roles: "",
  },
});

if (argv.help) {
  require("../src/commands/help")(argv._[0]);
} else {
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
      require("../src/commands/help")(argv._[1]);
      break;
    default:
      require("../src/commands/help")();
      break;
  }
}
