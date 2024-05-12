const express = require('express');
const { Login, registerWorkers, registerRecruiters } = require('../controller/user.controller');
const route = express.Router();
const usersController = require('../controller/user.controller');
const checkRole = require('../middleware/checkrole');

route.post('/login', Login);
route.get('/check-role', checkRole(['workers', 'recruiters']), usersController.checkRolesByToken);
route.post('/refresh-token', usersController.refreshToken)
route.post('/register/workers', registerWorkers);
route.post('/register/recruiters', registerRecruiters);

module.exports = route;
