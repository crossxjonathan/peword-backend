const express = require('express');
const { getAllWorkers, detailWorker, deleteWorker, updateWorker, profile} = require('../controller/worker.controller')
const route = express.Router();
const { protect } = require('../middleware/auth'); 

route.get('/profile', protect, profile)
route.get('/', protect, getAllWorkers);
route.get('/:id', detailWorker);
route.delete('/:id', protect, deleteWorker);
route.put('/:id', protect, updateWorker);

module.exports = route;