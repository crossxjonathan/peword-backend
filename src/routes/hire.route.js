const express = require('express');
const { addHire, getRecruiter, getWorker } = require('../controller/hire.controller');
const route = express.Router();

route.post('/', addHire);
route.get('/recruiters', getRecruiter);
route.get('/workers', getWorker);

module.exports = route