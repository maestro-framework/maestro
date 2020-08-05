const promptAsync = require('./promptAsync');

const asyncPromptYesNoAndExec = async (prompt, callback) => {
  switch ((await promptAsync(prompt, "y", "N")).trim().toLowerCase()) {
    case "y":
    case "yes":
      callback();
      break;
  }
};

module.exports = asyncPromptYesNoAndExec;
