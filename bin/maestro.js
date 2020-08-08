#!/usr/bin/env node

const minimist = require("minimist");
const argv = minimist(process.argv.slice(2), {
  boolean: ["f", "force"],
  string: ["roles"],
  default: {
    roles: "",
  },
});
const deploy = require('../src/commands/deploy');
const teardown = require('../src/commands/teardown');
const newProject = require('../src/commands/newProject');

switch(argv._[0]) {
  case 'deploy':
    deploy();
    break;
  case 'teardown':
    teardown(argv);
    break;
  case 'new':
    newProject(argv)
    break;
  default:
    console.log(`See documentation for commands (i.e. deploy, teardown).\n https://github.com/maestro-framework/maestro`);
}