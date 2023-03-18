
const models = require('../models/index.js');
class FileRepository {
  async create(imageData) {
    const image = await models.uploaded_files.create(imageData)
    return image
  }
  
   async getFilesByPage(pageNumber, pageSize) {
    return models.uploaded_files.findAll({
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
      order: [['creationDate', 'DESC']],
    });
  }

  async getFilesCount() {
    return models.uploaded_files.count();
  }
}
module.exports = new FileRepository();
