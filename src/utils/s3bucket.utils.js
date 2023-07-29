const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

class S3Util {
  s3Client;
  s3BucketName;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      },
    });

    this.s3BucketName = process.env.AWS_S3_BUCKET;
  }

  async upload(file, key) {
    const command = new PutObjectCommand({
      Bucket: this.s3BucketName,
      Key: key,
      Body: file.data,
    });

    await this.s3Client.send(command);
    return `https://${this.s3BucketName}.s3.amazonaws.com/${key}`;
  }
}

module.exports = S3Util;