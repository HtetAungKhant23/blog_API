const User = require('../../models/user/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateJwt');
const getTokenFromHeader = require('../../utils/getToken');

exports.signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existUser = await User.findOne({ email: email });
        if (existUser) {
            console.log(existUser);
            const err = new Error('email is already exist!');
            err.statusCode = 422;
            throw err;
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPw = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPw
        });

        res.status(201).json({
            message: 'successfully sign up!',
            user: user
        });

    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 422;
        }
        next(err);
    }
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error('user not found!');
            err.statusCode = 403;
            throw err;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            const err = new Error('password not match!');
            err.statusCode = 200;
            throw err;
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            eamil: user.email,
            token: generateToken(user._id)
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 422;
        }
        next(err);
    }
}

exports.profile = async (req, res, next) => {
    const userId = req.userAuth;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const err = new Error('user not found!');
            err.statusCode = 403;
            throw err;
        }
        res.status(200).json({
            user: user
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 422;
        }
        next(err);
    }
}

exports.profilePhoto = async (req, res, next) => {
    try{
        const user = await User.findById(req.userAuth);
        if(!user){
            const err = new Error('user not found!');
            err.statusCode = 403;
            throw err;
        }
        if(user.isBlock){
            const err = new Error('user is blocked!');
            err.statusCode = 200;
            throw err;
        }
        if(req.file){
            user.profilePhoto = req.file.path;
            res.status(200).json({
                message: 'updated profile photo!',
                user: user
            })
        }
        
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 422;
        }
        next(err);
    }
}

exports.whoViewsMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const userWhoView = await User.findById(req.userAuth);
        if (user && userWhoView) {
            const isUserViewExist = user.viewers.find((viewer) => {
                return viewer.toString() === userWhoView._id.toString();
            });
            if (isUserViewExist) {
                const err = new Error('user is already viewd!');
                throw err;
            } else {
                user.viewers.push(userWhoView._id);
                await user.save();
                res.status(200).json({
                    message: 'success',
                    user: user
                })
            }
        }
        throw new Error('user not found!');
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 422;
        }
        next(err);
    }
}
