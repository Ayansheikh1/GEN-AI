
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenBlacklistModel = require('../models/blacklist.model');

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

    const hash = await bcrypt.hash(password ,10);

    const user = await userModel.create({
        username,
        email,
        password:hash 
    })

    const token = jwt.sign(
        { id:user._id , username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );

    res.cookie("token",token);



    return res.status(201).json({
       
        message:"User registered successfully",
        user :{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController
 * @description Login an existing user, expects email and password in the request body.
 * @access public
 */


async function loginUserController(req,res){
  const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"please provide email and password"
        });
    }

    const user = await userModel.findOne({ email  });  

    if(!user){
        return res.status(400).json({
            
            message:"User not found"
        })
    }
    
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({
          
            message:"Invalid credential"
        })
    }

    const token = jwt.sign(
        { id:user._id , username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );

    res.cookie("token",token);

    return res.status(200).json({
        
        message:"Login successfully",
        user:{
            id:user._id,
            username: user.username,
            email:user.email
        }
    })
}

/**
 * 
    * @name logoutUserController
    * @description clear token from current user cookie and add the token to blacklist
    * @access Public
 */

async function logoutUserController(req,res){
    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({token});
    }

    res.clearCookie("token");

    res.status(200).json({
        message:"User logout succesfully"
    })

}

/**
 * @name getMeController
 * @description get current user details
 * @access private
 */
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id);
    res.status(200).json({
        message:"user details fetch successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {
registerUserController,
loginUserController,
logoutUserController,
getMeController
}






/*
 * File Description:
 * -----------------
 * This file contains authentication controller functions responsible
 * for handling user registration and login operations.
 *
 * Responsibilities:
 * 1. Receive authentication requests from routes.
 * 2. Validate incoming user data.
 * 3. Check if a user already exists in the database.
 * 4. Hash passwords before storing them in the database.
 * 5. Verify passwords during login.
 * 6. Generate JWT tokens for authenticated users.
 * 7. Store authentication tokens in cookies.
 * 8. Send appropriate success or error responses to the client.
 *
 * Controllers:
 * - registerUserController : Creates a new user account.
 * - loginUserController    : Authenticates an existing user.
 *
 * Authentication Flow:
 *
 * Registration:
 * Client → Route → Controller
 *        → Validate Data
 *        → Check Existing User
 *        → Hash Password
 *        → Save User
 *        → Generate JWT Token
 *        → Store Token in Cookie
 *        → Response
 *
 * Login:
 * Client → Route → Controller
 *        → Validate Credentials
 *        → Verify Password
 *        → Generate JWT Token
 *        → Store Token in Cookie
 *        → Response
 */