const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

exports.handler = async (request, context) => {
  const randomInt = getRandomInt(2);
  const decision = randomInt === 1 ? "accept" : "deny";

  return { decision, ...request };
};
