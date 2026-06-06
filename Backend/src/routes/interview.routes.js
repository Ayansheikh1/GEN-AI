const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const {generateInterviewReportController} = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');


const interviewRouter = express.Router();


/** 
 * @routes POST /api/interview
 * @description Generate an interview report based on the provided job description and self description.
 * @access Private
 *  
 */


interviewRouter.post('/',authMiddleware.authUser,upload.single('resume'),generateInterviewReportController);

module.exports = interviewRouter;
