const express = require('express');
const { addExperience, getAllExperience, updateExperience, detailExperience } = require('../controller/experience.controller');
const route = express.Router();
const { protect } = require('../middleware/auth'); 

route.post('/', protect, addExperience);
route.get('/', protect, getAllExperience);
route.put('/:id', protect, updateExperience);
route.get('/:id', protect, detailExperience);
route.delete('/:id', protect, detailExperience);

module.exports = route