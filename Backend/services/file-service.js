const AWS = require('aws-sdk');
const fileRepository = require('../repositories/file-repository');

class FileService {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  async uploadToS3(buffer, fileName) {
    const s3Object = await this.s3.upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: buffer,
    }).promise();
    return s3Object.Location;
  }

  async saveFileToDatabase(fileData) {
    return fileRepository.create(fileData);
  }

  async uploadFile(file, description) {
    try {
      const { originalname, buffer } = file;
      // Upload the file to S3 bucket
      const uploadedPath = await this.uploadToS3(buffer, originalname);

      // Create a new record in the UploadedFile table
      const uploadedFile = await this.saveFileToDatabase({
        uploadedPath,
        creationDate: new Date(),
        fileName: originalname,
        description
      });

      return uploadedFile;
    } catch (error) {
      console.error(error);
      throw new Error('Error uploading file');
    }
  }

   async getFilesByPage(pageNumber, pageSize) {
    const files = await fileRepository.getFilesByPage(pageNumber, pageSize);
    const count = await fileRepository.getFilesCount();
    return { files, count };
  }
}

module.exports = new FileService();
