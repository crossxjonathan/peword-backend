const express = require('express');
const { getAllSkill, addSkill, deleteSkill, updateSkill, detailSkill } = require('../controller/skill.controller');
const route = express.Router();
const { protect } = require('../middleware/auth'); 

route.get('/', protect, getAllSkill );
route.get('/:id', protect, detailSkill);
route.post('/', protect, addSkill);
route.delete('/:id', protect, deleteSkill);
route.put('/:id', protect, updateSkill);

module.exports = route