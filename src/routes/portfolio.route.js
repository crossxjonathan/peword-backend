const express = require('express');
const { addPortfolio, getAllPortfolio, updatePortfolio, detailPortfolio } = require('../controller/portfolio.controller');
const { protect, checkRole } = require('../middleware/auth'); 
const route = express.Router();

route.post('/', protect, addPortfolio);
route.get('/', protect, checkRole('workers'), getAllPortfolio);
route.put('/:id', protect, updatePortfolio);
route.get('/:id', protect, detailPortfolio);

module.exports = route;