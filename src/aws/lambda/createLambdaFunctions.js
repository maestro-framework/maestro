const retryAsync = require("../../util/retryAsync");
const { lambda } = require("../services");

const createLambdaFunctions = (allParams) => {
  const createFunctionPromises = allParams.map((params) =>
    retryAsync(() => lambda.createFunction(params).promise(), 5, 3000, 0.6)
  );

  return Promise.all(createFunctionPromises);
};

module.exports = createLambdaFunctions;
