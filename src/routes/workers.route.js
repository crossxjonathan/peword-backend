const express = require('express');
const { getAllWorkers, detailWorker, deleteWorker, updateWorker, profile, updatePhotoWorker} = require('../controller/worker.controller')
const route = express.Router();
const { protect } = require('../middleware/auth'); 
const upload = require('../middleware/upload');

route.get('/profile', protect, profile)
route.get('/', protect, getAllWorkers);
route.get('/:id', detailWorker);
route.delete('/:id', protect, deleteWorker);
route.put('/profile', protect, updateWorker);
route.put('/profile/photo', protect, upload.single('photo'), updatePhotoWorker);

module.exports = route;