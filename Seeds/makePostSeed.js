require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/postModel');

const post = {
    username: 'gsilvaepinto',
    comment: 'this is an example to test database'
};

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MONGO CONNECTION SUCCESS');

        const createdPost = await Post.create(post);
        console.log(createdPost);
    } catch (err) {
        console.log('MONGO CONNECTION ERROR:', err);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('DISCONNECTED FROM MONGODB');
    }
})();