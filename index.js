require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/postModel');
const methodOverride = require('method-override');

(async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MONGO CONNECTION SUCCESS');

        const app = express();
        const path = require('path');

        app.use(express.urlencoded({extended: true}));
        app.use(methodOverride('_method'));
        app.use(express.static(path.join(__dirname, 'public')));

        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '/views'));

        app.get('/', async (req, res) => {
            const posts = await Post.find({});
            res.render('index', {posts});
        })

        const PORT = process.env.PORT;
        app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
    }
    catch (err){
        console.log('MONGO CONNECTION ERROR:', err);
        process.exit(1);
    }
})()

process.on('SIGINT', async () => {
    console.log('\nClosing MongoDB...');
    await mongoose.connection.close();
    console.log('MongoDB connection closed. Exiting process.');
    process.exit(0);
})