const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already taken"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Account already exist with this email address"],
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

const userModel = mongoose.model('users',userSchema);

module.exports =userModel;



/*
 * File Description:
 * -----------------
 * This file defines the User model and schema for MongoDB using Mongoose.
 *
 * Its responsibilities are:
 * 1. Define the structure of user documents stored in the database.
 * 2. Specify validation rules such as required and unique fields.
 * 3. Create a Mongoose model based on the schema.
 * 4. Export the model so it can be used for database operations
 *    such as user registration, login, profile management, and queries.
 *
 * Collection Structure:
 * - username : Unique username of the user.
 * - email    : Unique email address of the user.
 * - password : User's encrypted password.
 */