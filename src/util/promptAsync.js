const readline = require('readline');

const promptAsync = (question) => {
  const rl = readline.createInterface({
    output: process.stdout,
    input: process.stdin,
  });

  return new Promise((resolve) => {
    rl.question(question, (result) => {
      rl.close();
      resolve(result);
    });
  });
};

module.exports = promptAsync;
