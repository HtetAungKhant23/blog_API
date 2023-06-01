const jwt = require('jsonwebtoken');
exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            return false;
        }
        return decoded;
    });
}