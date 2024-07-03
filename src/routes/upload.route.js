const express = require('express');
const route = express.Router();
const uploadController = require('../controller/upload.controller');
const upload = require('../middleware/upload');

route.post('/',upload.single('photo'), uploadController.uploadSingle);

module.exports = route;