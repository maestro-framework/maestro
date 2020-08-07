const generateRolePolicy = (service) => {
  return {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: `${service}.amazonaws.com`,
        },
        Action: "sts:AssumeRole",
      },
    ],
  };
};

module.exports = generateRolePolicy;
