// Mocks postProcessor
exports.handler = async (event) => {
  const string = Math.random() < 0.5 ? 'Hello World' : 'Hi there';
  return {
    data: string,
    isProcessingComplete: true
  };
}
