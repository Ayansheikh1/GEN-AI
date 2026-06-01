
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
 * This file contains all authentication-related controller functions.
 * Controllers act as the business logic layer between routes and database models.
 *
 * Responsibilities:
 * 1. Handle user registration requests.
 * 2. Handle user login requests.
 * 3. Handle user logout requests.
 * 4. Retrieve authenticated user information.
 * 5. Validate incoming request data.
 * 6. Interact with MongoDB models for user and token operations.
 * 7. Hash passwords before storing them in the database.
 * 8. Verify passwords during login.
 * 9. Generate JWT tokens for authenticated users.
 * 10. Store JWT tokens in browser cookies.
 * 11. Blacklist tokens during logout.
 * 12. Send appropriate success and error responses.
 *
 * Controllers:
 *
 * - registerUserController
 *   Creates a new user account after validating data,
 *   hashing the password, and generating an authentication token.
 *
 * - loginUserController
 *   Authenticates an existing user by verifying email and password,
 *   then generates a JWT token for future requests.
 *
 * - logoutUserController
 *   Logs out the current user by clearing the authentication cookie
 *   and storing the JWT token in the blacklist collection.
 *
 * - getMeController
 *   Returns information about the currently authenticated user.
 *   Requires successful authentication through middleware.
 *
 * Complete Authentication Flow:
 *
 * Registration:
 * User
 *  │
 *  ▼
 * Register Route
 *  │
 *  ▼
 * Validate Data
 *  │
 *  ▼
 * Check Existing User
 *  │
 *  ▼
 * Hash Password
 *  │
 *  ▼
 * Save User
 *  │
 *  ▼
 * Generate JWT
 *  │
 *  ▼
 * Store JWT in Cookie
 *  │
 *  ▼
 * Success Response
 *
 * Login:
 * User
 *  │
 *  ▼
 * Login Route
 *  │
 *  ▼
 * Verify Email
 *  │
 *  ▼
 * Compare Password
 *  │
 *  ▼
 * Generate JWT
 *  │
 *  ▼
 * Store JWT in Cookie
 *  │
 *  ▼
 * Success Response
 *
 * Protected Route Access:
 * User Request
 *  │
 *  ▼
 * Authentication Middleware
 *  │
 *  ▼
 * Read JWT from Cookie
 *  │
 *  ▼
 * Verify Token
 *  │
 *  ▼
 * Check Blacklist
 *  │
 *  ▼
 * Attach User Data to req.user
 *  │
 *  ▼
 * Controller Executes
 *
 * Logout:
 * User
 *  │
 *  ▼
 * Logout Route
 *  │
 *  ▼
 * Read JWT from Cookie
 *  │
 *  ▼
 * Save Token in Blacklist
 *  │
 *  ▼
 * Clear Cookie
 *  │
 *  ▼
 * Logout Success Response
 */