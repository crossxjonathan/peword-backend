const { response } = require("../helper/common");
const jwt = require('jsonwebtoken');

const checkRole = (roles) => (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return response(res, null, 403, 'Token Unavailable');
    }
  
    jwt.verify(token.replace('Bearer ', ''), process.env.JWTSECRET, (err, decoded) => {
      if (err) {
        return response(res, null, 403, 'Failed to authenticate token');
      }
    
      if (roles.includes(decoded.role)) {
        req.user = decoded;
        return response(res, decoded, 200, "Check Role Success")
      } else {
        return response(res, null, 403, 'you have not a permission!!');
      }
    });
  };  

module.exports = checkRole