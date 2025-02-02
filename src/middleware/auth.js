/* eslint-disable no-undef */
const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (bearerToken && bearerToken.startsWith('Bearer')) {
            const token = bearerToken.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWTSECRET);
            // console.log(decoded, '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
            req.user = { id: decoded.sub };
            req.decoded = decoded;
            // console.log('Authenticated user:', req.user);
            next();
        } else {
            next(createHttpError(400, 'Server Needs Token'));
        }
    } catch (error) {
        if (error && error.name === 'TokenExpiredError') {
            next(createHttpError(400, 'Token expired'));
        } else if (error && error.name === 'JsonWebTokenError') {
            next(createHttpError(400, 'Token invalid'));
        } else if (error && error.name === 'NoBeforeError') {
            next(createHttpError(400, 'Token not active'));
        } else {
            next(createHttpError.InternalServerError());
        }
    }
};

const checkRole = (roleName) => {
    return (req, res, next) => {
        const role = req.user.role;
        if (role !== roleName) {
            next(createHttpError(403, `${roleName} only!!`));
            return;
        }
        next();
    };
};

module.exports = {
    protect,
    checkRole
};
