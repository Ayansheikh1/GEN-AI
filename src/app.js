const express = require('express');
const cookieParser = require('cookie-parser')

// Create an Express application instance
const app = express();

app.use(express.json());
app.use(cookieParser());

/*require all the routes here */
const authRouter = require('./routes/auth.routes');

/*using all the routes here */
app.use("/api/auth", authRouter);




module.exports = app;

/*
 * This file is responsible only for:
 * 1. Creating the Express application.
 * 2. Registering global middleware.
 * 3. Connecting routes and configurations.
 *
 * The actual server startup (app.listen)
 * should be handled in a separate file
 * such as server.js
 */