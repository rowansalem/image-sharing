const multer = require('multer');
const express = require('express');
const FileService = require('../services/file-service');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    const { file, body } = req;
    const { description } = body;

    const uploadedFile = await FileService.uploadFile(file, description);

    res.status(200).json({ message: 'File uploaded successfully', file: uploadedFile });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/files', async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const pageSizeNumber = parseInt(pageSize, 10) || 10;

    const { files, count } = await FileService.getFilesByPage(pageNumber, pageSizeNumber);

    res.status(200).json({ data : files, count, page: pageNumber, pageSize: pageSizeNumber });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;