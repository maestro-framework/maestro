const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

exports.handler = async (event) => {
  if (getRandomInt(3) < 2) {
    throw new Error("Provisioning failed");
  } else {
    return "arn:foobar:baz";
  }
};
