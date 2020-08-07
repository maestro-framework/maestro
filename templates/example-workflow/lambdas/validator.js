exports.handler = async (event, context) => {
  if (event.request === "%499asdf}#3{") throw new Error("Invalid request!");

  return event;
};
