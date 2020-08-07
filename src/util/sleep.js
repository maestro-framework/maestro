async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = sleep;
