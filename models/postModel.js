const mongoose = require('mongoose');
const { Schema } = mongoose;

const makePost = new Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', makePost);
module.exports = Post;