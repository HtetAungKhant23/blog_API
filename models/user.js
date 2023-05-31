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
    postCount: {
        type: Number,
        default: 0
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
    viewBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    followers: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    active: {
        type: Boolean,
        default: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

module.exports = mongoose.model('User', userSchema);