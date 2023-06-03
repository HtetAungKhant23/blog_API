const getTokenFromHeader = require("../utils/getToken");
const { verifyToken } = require("../utils/verifyToken");

exports.isAuth = (req, res, next) => {
    const token = getTokenFromHeader(req);
    const decodedUser = verifyToken(token);
    if(!decodedUser){
        const err = new Error('this token is not verify, Please sign in again!');
        next(err);
    }

    req.userAuth = decodedUser.id;
    next();
}