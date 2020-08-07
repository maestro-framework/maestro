const promptAsync = require("./promptAsync");

const promptAsyncYesNoAndExec = async (prompt, callback) => {
  switch ((await promptAsync(prompt, "y", "N")).trim().toLowerCase()) {
    case "y":
    case "yes":
      callback();
      break;
  }
};

module.exports = promptAsyncYesNoAndExec;
