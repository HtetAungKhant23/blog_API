const User = require("../models/user/userModel");

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userAuth);
    if(!user.isAdmin){
        const err = new Error('access denied, Admin only!');
        next(err);
    }
    next();    
}

module.exports = isAdmin;