const express = require('express');
const { getAllSkill, addSkill, deleteSkill, updateSkill, detailSkill } = require('../controller/skill.controller');
const route = express.Router();


route.get('/', getAllSkill);
route.get('/:id', detailSkill);
route.post('/', addSkill);
route.delete('/:id', deleteSkill);
route.put('/:id', updateSkill);

module.exports = route