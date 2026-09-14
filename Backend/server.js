require("dotenv").config();
const app = require('./src/app');// Start the server
const connectToDB = require('./src/config/database');





connectToDB();





app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running');
})

/*

 * This file is the entry point of the application.
 * Its responsibility is to:
 * 1. Load environment variables from the .env file.
 * 2. Import the configured Express application.
 * 3. Start the server and make it listen for incoming requests.
 *
 * Request Flow:
 * Client → Server (this file) → app.js → Routes → Controllers → Response
 */