const jwt =require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model')

async function authUser(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"token not provided"
        });
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({token});

    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"token is invalid"
        })
    }
  


    try {
         const decoded =  jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({
            message:"Token invalid"
        })
    }
  


}

module.exports = {authUser}




/*
 * File Description:
 * -----------------
 * This file contains authentication middleware responsible for
 * protecting private routes in the application.
 *
 * Responsibilities:
 * 1. Extract JWT token from browser cookies.
 * 2. Verify that a token is provided with the request.
 * 3. Check whether the token exists in the blacklist collection.
 * 4. Validate the token using the JWT secret key.
 * 5. Decode authenticated user information from the token.
 * 6. Attach user information to req.user for downstream controllers.
 * 7. Prevent unauthorized access to protected routes.
 * 8. Forward authenticated requests to the next middleware/controller.
 *
 * Authentication Flow:
 *
 * Client Request
 *      │
 *      ▼
 * Read Token From Cookie
 *      │
 *      ▼
 * Token Present?
 *      │
 *   No ─────► 401 Unauthorized
 *      │
 *     Yes
 *      │
 *      ▼
 * Check Blacklist
 *      │
 *      ▼
 * Blacklisted?
 *      │
 *   Yes ─────► 401 Unauthorized
 *      │
 *     No
 *      │
 *      ▼
 * Verify JWT Signature
 *      │
 *      ▼
 * Valid Token?
 *      │
 *   No ─────► 401 Unauthorized
 *      │
 *     Yes
 *      │
 *      ▼
 * Attach User To req.user
 *      │
 *      ▼
 * next()
 *      │
 *      ▼
 * Protected Controller
 *
 * Protected Routes Using This Middleware:
 * - GET /api/auth/get-me
 * - Any future authenticated routes
 */