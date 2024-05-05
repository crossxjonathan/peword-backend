require('dotenv').config();

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { checkUserById } = require('../models/users');

const jwtOptions = {
    secretOrKey: process.env.JWTSECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const JwtFunction = new JwtStrategy(
    jwtOptions,
    async function (payload, done) {
        try {
            const user = await checkUserById(payload.sub);
            if(!user) {
                return done(null, false)
            }
            done(null, user);
        } catch (error) {
            done(error, false)
        }
    }
)

module.exports = {
    JwtFunction
}