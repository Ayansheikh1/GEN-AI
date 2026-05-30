const express = require('express');

// Create an Express application instance
const app = express();

app.use(express.json());




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