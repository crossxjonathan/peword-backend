const express = require('express');
const { addPortfolio, getAllPortfolio, updatePortfolio, detailPortfolio, deletePortfolio } = require('../controller/portfolio.controller');
const { protect } = require('../middleware/auth'); 
const route = express.Router();

route.post('/', protect, addPortfolio);
route.get('/', protect, getAllPortfolio);
route.put('/:id', protect, updatePortfolio);
route.get('/:id', protect, detailPortfolio);
route.delete('/:id', protect, deletePortfolio);

module.exports = route;