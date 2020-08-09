const fs = require("fs");
const titleize = require("./titleize");
const cleanupProjectName = require("./cleanupProjectName");

const createEmptyProject = (name) => {
  fs.writeFileSync(
    `${name}/README.md`,
    `# ${titleize(cleanupProjectName(name))}\n\n`
  );
  fs.writeFileSync(`${name}/definition.asl.json`, "{}");
  fs.mkdirSync(`${name}/lambdas`);
};

module.exports = createEmptyProject;
