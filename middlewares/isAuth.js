const getTokenFromHeader = require("../utils/getToken");
const { verifyToken } = require("../utils/verifyToken");

exports.isAuth = (req, res, next) => {
    const token = getTokenFromHeader(req);
    const decodedUser = verifyToken(token);
    if(!decodedUser){
        return res.status(200).json({
            message: 'this token is not verify, Please sign in again!'
        });
    }
    req.userAuth = decodedUser.id;
    next();
}