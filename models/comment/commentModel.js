const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'main post is required!']
    },
    user: {
        type: Object,
        required: [true, 'user is required!']
    },
    description: {
        type: String,
        required: [true, 'comment description is required!']
    }
}, {timestamps: true});

module.exports = mongoose.model('Comment', commentSchema);