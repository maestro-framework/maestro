#!/usr/bin/env node

const deploy = require("../src/commands/deploy");
const teardown = require("../src/commands/teardown");
const newProject = require("../src/commands/newProject");
const getTemplates = require("../src/commands/getTemplates");
const config = require("../src/commands/config");
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

switch (argv._[0]) {
  case "config":
    config();
    break;
  case "deploy":
    deploy();
    break;
  case "teardown":
    teardown(argv);
    break;
  case "new":
    newProject(argv);
    break;
  case "get-templates":
    getTemplates();
    break;
  default:
    console.log(
      `See man pages for commands (i.e. maestro(1), maestro-deploy(1), maestro-teardown(1), etc.)`
    );
}
