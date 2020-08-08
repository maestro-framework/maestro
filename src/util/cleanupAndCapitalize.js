const capitalize = require("../util/capitalize");

const cleanupAndCapitalize = (str) => {
  const cleaned = str.replace(/[-_]/g, " ");
  return capitalize(cleaned);
};

module.exports = cleanupAndCapitalize;
