const User = require('../../models/user/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
        throw err.message;
    }
}


exports.signin = async (req, res, next) => {




}
