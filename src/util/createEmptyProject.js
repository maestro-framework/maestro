const fs = require("fs");
const titleize = require("../util/titleize");
const cleanupProjectName = require("../util/cleanupProjectName");

const createEmptyProject = (name) => {
  fs.writeFileSync(`${name}/README.md`, `# ${titleize(cleanupProjectName(name))}\n\n`);
  fs.writeFileSync(`${name}/definition.asl.json`, "{}");
  fs.mkdirSync(`${name}/lambdas`);
};

module.exports = createEmptyProject;
