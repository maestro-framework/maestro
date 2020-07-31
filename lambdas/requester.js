const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const possibleRequests = [
  "workspace",
  "development server",
  "production server",
  "%499asdf}#3{",
];

const requesters = [
  "stan@test.com",
  "barry@test.com",
  "rod@test.com",
  "rick@test.com",
];

exports.handler = async (event, context) => {
  const randomInt = getRandomInt(4);
  const requestForManager = possibleRequests[randomInt];
  const randomRequester = requesters[randomInt];
  const request = {
    requester: randomRequester,
    request: requestForManager,
  };

  return request;
};
