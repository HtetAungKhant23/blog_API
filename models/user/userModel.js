const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'fast name is required!']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required!']
    },
    email: {
        type: String,
        required: [true, 'email is required!']
    },
    password: {
        type: String,
        required: [true, 'password is required!']
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["Admin", "Guest", "Editor"]
    },
    viewers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    blocked: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    plan: [{
        type: String,
        enum: ['Free', 'Platinum', 'Pro'],
        default: 'Free'
    }],
    userAward: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold'],
        default: 'Bronze'
    },
    profilePhoto: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);