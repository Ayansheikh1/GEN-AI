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
 * This file defines all authentication-related API routes of the application.
 *
 * Its responsibilities are:
 * 1. Create a dedicated router for authentication operations.
 * 2. Map API endpoints to their corresponding controller functions.
 * 3. Apply authentication middleware to protected routes.
 * 4. Forward incoming requests to the appropriate controller.
 * 5. Export the router for integration into the main Express application.
 *
 * Authentication Routes:
 *
 * Public Routes:
 * - POST /register
 *   Registers a new user account.
 *
 * - POST /login
 *   Authenticates an existing user and generates a JWT token.
 *
 * - GET /logout
 *   Logs out the current user by clearing the authentication cookie
 *   and invalidating the token if a blacklist mechanism is implemented.
 *
 * Protected Routes:
 * - GET /get-me
 *   Returns details of the currently authenticated user.
 *   Requires a valid JWT token and authentication middleware.
 *
 * Route Flow:
 *
 * Public Request
 *      │
 *      ▼
 * Auth Routes
 *      │
 *      ▼
 * Controller
 *      │
 *      ▼
 * Response
 *
 * Protected Request
 *      │
 *      ▼
 * Auth Routes
 *      │
 *      ▼
 * Authentication Middleware
 *      │
 *      ▼
 * Controller
 *      │
 *      ▼
 * Response
 */