const express = require('express');
const { getAllRecruiters, detailRecruiter, deleteRecruiter, updateRecruiter, profile, updatePhotoRecruiter } = require('../controller/recruiter.controller');
const route = express.Router();
const { protect } = require('../middleware/auth'); 
const upload = require('../middleware/upload');

route.get('/profile', protect, profile);
route.get('/', protect, getAllRecruiters);
route.get('/:id', detailRecruiter);
route.delete('/:id', protect, deleteRecruiter);
route.put('/profile', protect, updateRecruiter);
route.put('/profile/photo', protect, upload.single('photo'), updatePhotoRecruiter);

module.exports = route;