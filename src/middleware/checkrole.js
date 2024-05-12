const { response } = require("../helper/common");
const jwt = require('jsonwebtoken');

const checkRole = (allowedRoles) => (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return response(res, null, 403, 'No token provided');
    }
  
    jwt.verify(token.replace('Bearer ', ''), process.env.JWTSECRET, (err, decoded) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        return response(res, null, 403, 'Failed to authenticate token');
      }
  
      console.log('Decoded Token:', decoded);
  
      if (allowedRoles.includes(decoded.role)) {
        req.user = decoded;
        return response(res, decoded, 200, "Check Role Success")
      } else {
        return response(res, null, 403, 'Insufficient permissions');
      }
    });
  };  

module.exports = checkRole