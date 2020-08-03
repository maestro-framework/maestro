const sleep = require('./sleep');

async function retryAsync(
  promiseCallback,
  maxAttempts = 3,
  interval = 2000,
  backoffRate = 3
) {
  try {
    await promiseCallback();
  } catch (err) {
    // base case
    if (maxAttempts <= 1) {
      throw err;
    }

    console.log("Unsuccessful operation. Retrying...");

    await sleep(interval);
    await retryAsync(
      promiseCallback,
      maxAttempts - 1,
      interval * backoffRate,
      backoffRate
    );
  }
}

module.exports = retryAsync;