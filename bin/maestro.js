#!/usr/bin/env node

const deploy = require("../src/commands/deploy");
const teardown = require("../src/commands/teardown");
const newProject = require("../src/commands/newProject");
const getTemplates = require("../src/commands/getTemplates");
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
  case "deploy":
    deploy();
    break;
  case "teardown":
    teardown(argv);
    break;
  case "new":
    newProject(argv);
    break;
  // TODO: perhaps `maestro get-templates` should be called as part of the `maestro config` command? If so, should we still leave `get-templates` as a top level sub-command?
  case 'get-templates':
    getTemplates();
    break;
  default:
    console.log(
      `See documentation for commands (i.e. deploy, teardown).\n https://github.com/maestro-framework/maestro`
    );
}
