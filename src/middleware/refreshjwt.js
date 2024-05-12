const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const refreshTokenJWT = (userid) => {
    const refreshToken = jwt.sign({ userid }, process.env.JWTSECRET, {
        expiresIn: '1d'
    });
    const refreshTokenId = uuidv4();

    return { refreshToken, refreshTokenId}
};

module.exports = {
    refreshTokenJWT
}

