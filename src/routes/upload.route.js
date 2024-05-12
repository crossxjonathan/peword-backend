const express = require('express');
const route = express.Router();
const uploadController = require('../controller/upload.controller');
const upload = require('../middleware/upload');

route.post('/',upload.single('file'), uploadController.uploadSingle);
route.put('/:fileId', uploadController.updateUpload);
route.delete('/:fileId', uploadController.deleteUpload);

module.exports = route;