const mockAPICall = async () => {
  const random = Math.random();
  // mock failing
  if (random < 0.25) {
    throw new Error("It failed!");
  } else if (random < 0.5) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
};

exports.handler = async (event) => {
  // const r = new XMLHttpRequest();
  // Do the rest here

  // This mocks random failures and time waiting for response
  await mockAPICall();

  return { success: true };
};
