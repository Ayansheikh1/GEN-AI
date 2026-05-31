const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware')

const authRouter = express.Router();

/**
 * @routes POST /api/auth/register
 * @description Register a new user with username, email, and password.
 * @access Public
 */

authRouter.post('/register',authController.registerUserController);


/**
 * @routes POST /api/auth/rlogin
 * @description login user with email and password
 * @access Public
 */

authRouter.post('/login',authController.loginUserController);


/**
 * @routes GET /api/auth/logout
 * @description clear token from current user cookie and add the token to blacklist
 * @access Public
 */
authRouter.get('/logout',authController.logoutUserController);


/**
 * @routes GET /api/auth/get-me
 * @description get current user details
 * @access Private
 */

authRouter.get('/get-me',authMiddleware.authUser,authController.getMeController);


module.exports = authRouter;









/*
 * File Description:
 * -----------------
 * This file defines authentication-related routes for the application.
 *
 * Its responsibilities are:
 * 1. Create a dedicated router for authentication operations.
 * 2. Map API endpoints to their corresponding controller functions.
 * 3. Receive incoming authentication requests and forward them to controllers.
 * 4. Export the router so it can be integrated into the main application.
 *
 * Current Routes:
 * - POST /register : Register a new user account.
 */