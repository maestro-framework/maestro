const readline = require("readline");

const promptAsync = (question, ...options) => {
  const rl = readline.createInterface({
    output: process.stdout,
    input: process.stdin,
  });

  let prompt = `${question}${
    options.length > 0 ? " [" + options.join("/") + "]" : ""
  } `;

  return new Promise((resolve) => {
    rl.question(prompt, (result) => {
      rl.close();
      resolve(result);
    });
  });
};

module.exports = promptAsync;
