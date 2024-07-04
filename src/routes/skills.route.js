const express = require('express');
const {addSkill, deleteSkill, updateSkill, detailSkill, getMySkills } = require('../controller/skill.controller');
const route = express.Router();
const { protect } = require('../middleware/auth'); 

route.get('/', protect, getMySkills );
route.get('/:id', protect, detailSkill);
route.post('/', protect, addSkill);
route.delete('/:id', protect, deleteSkill);
route.put('/:id', protect, updateSkill);

module.exports = route