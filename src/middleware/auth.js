/* eslint-disable no-undef */
const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        if(bearerToken && bearerToken.startsWith('Bearer')) {
            const token = bearerToken.split(' ')[1]
            // console.log(token, "<<<token");
            const decoded = jwt.verify(token, process.env.JWTSECRET);
            // console.log(decoded, "<<<decode");
            // const name = "jonathan"
            // req.name = name
            req.decoded = decoded
            next()
        } else {
            next(createHttpError(400, 'Server Need Token'))
        }
    } catch (error) {
        if(error && error.name === 'TokenExpiredError'){
            next(createHttpError(400, 'token expired'))
        } else if (error && error.name === 'JsonWebTokenError'){
            next(createHttpError(400, 'Token invalid'))
        } else if (error && error.name === 'NoBeforeError'){
            next(createHttpError(400, 'token not active'))
        } else{
            next(createHttpError.InternalServerError())
        }
    }
}

// const validationRole = (req, res, next) => {
//     const role = req.decoded.role
//     console.log(role, '<<<<<<<<<<<<<<<role');
//     if(role !== 'workers') {
//         next(createHttpError(403, "Worker Only!"))
//         return
//     }
//     next()
// }

const checkRole = (roleName) => {
    return (req, res, next) => {
        const role = req.decoded.role
        if(role !== roleName) {
            next(createHttpError(403, `${roleName} only!!`))
            return
        }
        next()
    }
}

module.exports = {
    protect,
    checkRole
}