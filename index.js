require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

(async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MONGO CONNECTION SUCCESS');

        const app = express();

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