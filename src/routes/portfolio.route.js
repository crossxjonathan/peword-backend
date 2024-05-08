const express = require('express');
const { addPortfolio, getAllPortfolio, updatePortfolio, detailPortfolio } = require('../controller/portfolio.controller');

const route = express.Router();

route.post('/', addPortfolio);
route.get('/', getAllPortfolio);
route.put('/:id', updatePortfolio)
route.get('/:id', detailPortfolio)

module.exports = route;