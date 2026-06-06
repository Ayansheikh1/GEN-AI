const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Create an Express application instance
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

/*require all the routes here */
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

/*using all the routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview",interviewRouter);




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