const express = require('express');
const { Login, registerWorkers, registerRecruiters } = require('../controller/user.controller');
const route = express.Router();

route.get('/login', Login);
route.post('/register/workers', registerWorkers);
route.post('/register/recruiters', registerRecruiters);

module.exports = route;
