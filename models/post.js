const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'post title is required!'],
        tirm: true
    },
    description: {
        type: String,
        required: [true, 'post description is required!']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'post category is required!']
    },
    numViews: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    disLikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please Author is required!']
    },
    photo: {
        type: String,
        required: [true, 'post image is required!']
    }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);