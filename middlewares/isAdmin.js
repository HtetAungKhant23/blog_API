const User = require("../models/user/userModel");
const getTokenFromHeader = require("../utils/getToken");
const {verifyToken} = require("../utils/verifyToken");

exports.isAdmin = async (req, res, next) => {
    const token = getTokenFromHeader(req);
    const decoded = verifyToken(token);
    req.userAuth = decoded.id;
    const user = await User.findById(decoded.id);
    if(user.isAdmin){
        next();
    }else{
        const err = new Error('access denied, Admin only!');
        next(err);
    }
}
