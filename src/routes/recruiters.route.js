const express = require('express');
const { getAllRecruiters, detailRecruiter, addRecruiter, deleteRecruiter, updateRecruiter, profile } = require('../controller/recruiter.controller');
const route = express.Router();
const { protect } = require('../middleware/auth'); 

route.get('/profile', protect, profile);
route.get('/', protect, getAllRecruiters);
route.get('/:id', protect, detailRecruiter);
route.post('/', protect, addRecruiter);
route.delete('/:id', protect, deleteRecruiter);
route.put('/:id', protect, updateRecruiter);

module.exports = route;