const express = require('express');
const { getAllRecruiters, detailRecruiter, addRecruiter, deleteRecruiter, updateRecruiter } = require('../controller/recruiter.controller');
const route = express.Router();

route.get('/', getAllRecruiters);
route.get('/:id', detailRecruiter);
route.post('/', addRecruiter);
route.delete('/:id', deleteRecruiter);
route.put('/:id', updateRecruiter);

module.exports = route;