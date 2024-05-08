const express = require('express');
const { addExperience, getAllExperience, updateExperience, detailExperience } = require('../controller/experience.controller');
const route = express.Router();

route.post('/', addExperience);
route.get('/', getAllExperience);
route.put('/:id', updateExperience);
route.get('/:id', detailExperience);
route.delete('/:id', detailExperience);

module.exports = route