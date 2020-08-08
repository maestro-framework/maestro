const fs = require("fs");
const titleize = require("../util/titleize");

const cleanupAndTitleize = (str) => {
  const cleaned = str.replace(/[-_]/g, " ");
  return titleize(cleaned);
};

const createEmptyProject = (name) => {
  fs.writeFileSync(`${name}/README.md`, `# ${cleanupAndTitleize(name)}\n\n`);
  fs.writeFileSync(`${name}/definition.asl.json`, "{}");
  fs.mkdirSync(`${name}/lambdas`);
};

module.exports = createEmptyProject;
