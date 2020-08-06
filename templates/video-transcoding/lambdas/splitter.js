// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

exports.handler = async ({
  sourceBucket,
  intermediateBucket,
  destinationBucket
}) => {
  // Use S3 bucket as a source for video
  // obtain length of video and split into multiple segments

  // this is a naive interpretation
  const segments = [];

  // Build up an array of segments

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

  return { segments, intermediateBucket, destinationBucket };
};
