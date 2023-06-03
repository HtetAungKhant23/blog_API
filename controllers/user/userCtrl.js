const User = require('../../models/user/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateJwt');

exports.signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existUser = await User.findOne({ email: email });
        if (existUser) {
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
        next(err);
    }
}

exports.profilePhoto = async (req, res, next) => {
    try {
        const user = await User.findById(req.userAuth);
        if (!user) {
            const err = new Error('user not found!');
            err.statusCode = 403;
            throw err;
        }
        if (user.isBlock) {
            const err = new Error('user is blocked!');
            err.statusCode = 200;
            throw err;
        }
        if (req.file) {
            user.profilePhoto = req.file.path;
            res.status(200).json({
                message: 'updated profile photo!',
                user: user
            })
        }
    } catch (err) {
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
            }
            user.viewers.push(userWhoView._id);
            await user.save();
            res.status(200).json({
                message: 'success',
                user: user
            });
        }
        throw new Error('user not found!');
    } catch (err) {
        next(err);
    }
}

exports.following = async (req, res, next) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const userWhofollow = await User.findById(req.userAuth);
        if (userToFollow && userWhofollow) {
            const isAlreadyFollow = userToFollow.followers.find(follower => follower.toString() === userWhofollow._id.toString());
            if (isAlreadyFollow) {
                const err = new Error('user already followed!');
                console.log(err.message);
                throw err;
            }
            userToFollow.followers.push(userWhofollow._id);
            userWhofollow.following.push(userToFollow._id);
            await userToFollow.save();
            await userWhofollow.save();
            return res.status(200).json({
                message: 'user following success!',
                userToFollow,
                userWhofollow
            });
        }
        const err = new Error('user not found!');
        throw err;
    } catch (err) {
        next(err);
    }
}

exports.unFollowing = async (req, res, next) => {
    try {
        const userToUnFollow = await User.findById(req.params.id);
        const userWhoUnFollow = await User.findById(req.userAuth);
        if(userToUnFollow && userWhoUnFollow){
            const isAlreadyFollow = userToUnFollow.followers.find(follower => follower.toString() === userWhoUnFollow._id.toString());
            if(!isAlreadyFollow){
                const err = new Error('user is not follow yet!');
                throw err;
            }
            userToUnFollow.followers = userToUnFollow.followers.filter(follower => follower.toString() !== userWhoUnFollow._id.toString());
            await userToUnFollow.save();
            userWhoUnFollow.following = userWhoUnFollow.following.filter(following => following.toString() !== userToUnFollow._id.toString());
            await userWhoUnFollow.save();
            res.status(200).json({
                message: 'user unfollowing success!',
                userToUnFollow,
                userWhoUnFollow
            });
        }
        const err = new Error('user not found!');
        throw err;
    } catch (err) {
        next(err);
    }
}
