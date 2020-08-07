// TODO: currently not being used, may implement in deploy.js

const fs = require("fs");

const requireJSON = (relPath) => {
  let absPath = __dirname + "/" + relPath;

  if (!absPath.endsWith(".json")) {
    absPath = `${absPath}.json`;
  }

  return JSON.parse(fs.readFileSync(absPath));
};

module.exports = requireJSON;
