const express = require('express');
const { addHire, getRecruiter, getWorker } = require('../controller/hire.controller');
const route = express.Router();
const { protect } = require('../middleware/auth'); 

route.post('/', protect, addHire);
route.get('/recruiters', protect, getRecruiter);
route.get('/workers', protect, getWorker);

module.exports = route