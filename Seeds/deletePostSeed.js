require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/postModel');

(async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MONGO CONNECTION SUCCESS');

        const deletePost = await Post.findOneAndDelete({username: 'gsilvaepinto'});
        if (!deletePost){
            console.log('NO POST FOUND'); 
        } else {
            console.log(deletePost);
        }
    }
    catch (err){
        console.log('MONGO CONNECTION ERROR:', err);
        process.exit(1);
    }
    finally{
        await mongoose.disconnect();
        console.log('DISCONNECTED FROM MONGODB');
    }
})()
