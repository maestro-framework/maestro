const capitalize = require("./capitalize");
const cleanupProjectName = require("./cleanupProjectName");

const convertCamelCaseToSpaces = (str) => {
  const rest = str.slice(1);
  const converted = rest.replace(
    /\s*([A-Z])/g,
    (match, char) => " " + char.toLowerCase()
  );

  return str[0] + converted;
};

const beautifyProjectName = (name) => {
  const cleaned = cleanupProjectName(name);
  const converted = convertCamelCaseToSpaces(cleaned);
  const capitalized = capitalize(converted);

  return capitalized;
};

module.exports = beautifyProjectName;
