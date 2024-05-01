const express = require('express');
const { getAllWorkers, detailWorker, addWorker, deleteWorker, updateWorker, searchKey, workerSortByName} = require('../controller/worker.controller')
const route = express.Router();

route.get('/', getAllWorkers);
route.get('/search/:name', searchKey);
route.get('/sortByName', workerSortByName);
route.get('/:id', detailWorker);
route.post('/', addWorker);
route.delete('/:id', deleteWorker);
route.put('/:id', updateWorker);

module.exports = route;