// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

exports.handler = async ({
  intermediateBucket,
  destinationBucket
}) => {
  // Sleep in order to simulate joining segments
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Reads from intermediateBucket
  // Joins segments into one video, back in order
  // Write joined video to destinationBucket
};
