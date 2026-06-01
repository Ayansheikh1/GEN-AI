const mongoose = require('mongoose');

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database "); 
    }catch(err){
        console.log(err);
    }
}

module.exports = connectToDB;

/*
 * File Description:
 * -----------------
 * This file is responsible for establishing a connection
 * between the application and the MongoDB database using Mongoose.
 *
 * Its responsibilities are:
 * 1. Read the MongoDB connection URL from environment variables.
 * 2. Connect the application to the MongoDB database.
 * 3. Handle connection errors if the database is unavailable.
 * 4. Export the connection function so it can be used during server startup.
 */