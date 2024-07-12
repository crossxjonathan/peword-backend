const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const refreshTokenJWT = ({userid, email, role}) => {
    const refreshToken = jwt.sign({ userid, email, role }, process.env.JWTSECRET, {
        expiresIn: '1d'
    });

    return refreshToken
};

module.exports = {
    refreshTokenJWT
}

