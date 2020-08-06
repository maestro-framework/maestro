// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();
// Require transcoding application

exports.handler = async ({
  segmentMetaData,
  sourceBucket,
  intermediateBucket,
}) => {
  // Sleep in order to simulate transcoding segments
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Read from source bucket using particular segment meta data
  // Perform transcoding on segment
  // Write transcoded segment to intermediate bucket
  return { success: true };
};
