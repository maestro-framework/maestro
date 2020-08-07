#!/usr/bin/env node

const minimist = require("minimist");
const argv = minimist(process.argv.slice(2), {
  boolean: ["f", "force"],
  string: ["roles"],
  default: {
    roles: "",
  },
});
const deploy = require('./deploy');

switch(argv._[0]) {
  case 'deploy':
    deploy();
    break;
  default:
}
