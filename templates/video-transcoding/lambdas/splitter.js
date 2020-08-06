// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

exports.handler = async ({
  sourceBucket,
  intermediateBucket,
  destinationBucket
}) => {
  // Use S3 bucket as a source for video
  const segmentsMetaData = [];

  // Build up an array of segments meta data...
  // Example segment object:
  // {
  //   resolution: xxx,
  //   name: '001',
  //   startTime: 0,
  //   endTime: 5,
  //   sourceKey: sourceBucket.key,
  //   sourceBucketName: sourceBucket.name,
  //   intermediateBucketName: intermediateBucket.name,
  // }

  return { segmentsMetaData, sourceBucket, intermediateBucket, destinationBucket };
};
