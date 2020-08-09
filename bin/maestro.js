#!/usr/bin/env node

const minimist = require("minimist");
const argv = minimist(process.argv.slice(2), {
  boolean: ["f", "force"],
  string: ["roles"],
  default: {
    roles: "",
  },
});
const deploy = require("../src/commands/deploy");
const teardown = require("../src/commands/teardown");

switch (argv._[0]) {
  case "deploy":
    deploy();
    break;
  case "teardown":
    teardown(argv);
    break;
  default:
    console.log(
      `See man pages for commands (i.e. maestro(1), maestro-deploy(1), maestro-teardown(1), etc.)`
    );
}
