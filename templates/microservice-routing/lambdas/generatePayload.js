// Mocks initial microservice that will generate the payload
exports.handler = async (event) => {
  const isComplete = Math.random() < 0.33;
  const string = Math.random() < 0.5 ? 'Hello World' : 'Hi there';

  return {
    isProcessingComplete: isComplete,
    data: string
  }
}
