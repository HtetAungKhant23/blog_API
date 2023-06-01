const User = require('../../models/user/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateJwt');
const getTokenFromHeader = require('../../utils/getToken');

exports.signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existUser = await User.findOne({email: email});
        if(existUser){
            res.status(200).json({
                message: 'email is already exist!'
            })
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
        throw err;
    }
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({
                message: 'user not found!'
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(200).json({
                message: 'password is not match!'
            });
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            eamil: user.email,
            token: generateToken(user._id)
        });
    } catch (err) {
        throw err;
    }
}

exports.profile = async (req, res, next) => {
    const userId = req.userAuth;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(200).json({
                message: 'user not found!'
            });
        }
        res.status(200).json({
            user: user
        });
    } catch (err) {
        throw err;
    }
}
