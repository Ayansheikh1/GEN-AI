
const userModel = require('../models/user.model');

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body.
 * @access public
  
 */

async function registerUserController(req,res){
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"please provide username,email,password"
        });
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or:[{email},{username}]
    });

    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"Account already exist with this username or email address"
        })
    }
}


module.exports = {
registerUserController
}






/*
 * File Description:
 * -----------------
 * This file contains controller functions related to user authentication.
 *
 * Its responsibilities are:
 * 1. Receive requests forwarded by authentication routes.
 * 2. Process business logic related to user authentication.
 * 3. Interact with the User model to perform database operations.
 * 4. Validate incoming request data.
 * 5. Send appropriate success or error responses to the client.
 *
 * Current Controllers:
 * - registerUserController : Handles new user registration.
 */