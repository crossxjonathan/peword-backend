const express = require('express');
const { getAllWorkers, detailWorker, addWorker, deleteWorker, updateWorker} = require('../controller/worker.controller')
const route = express.Router();

route.get('/', getAllWorkers);
route.get('/:id', detailWorker);
route.post('/', addWorker);
route.delete('/:id', deleteWorker);
route.put('/:id', updateWorker);

module.exports = route;