const User = require('../../models/user/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateJwt');

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

        console.log(user);

        res.status(201).json({
            message: 'successfully sign up!',
            user: user
        });

    } catch (err) {
        throw err.message;
    }
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(200).json({
            message: 'user not found!'
        });
    }
    const passwordMatch = await bcrypt.compare(password, user.hashedPw);
    if(!passwordMatch){
        res.status(200).json({
            message: 'password is not match!'
        });
    }

    res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        eamil: user.email,
        token: generateToken(user._id)
    });
}

exports.profile = async (req, res, next) => {
    const {id} = req.params;
    const user = await User.findById(id);
    if(!user){
        res.status(200).json({
            message: 'user not found!'
        });
    }
    res.status(200).json({
        user: user
    });
}
