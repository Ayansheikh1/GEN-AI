const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');


const interviewRouter = express.Router();


/** 
 * @routes POST /api/interview
 * @description Generate an interview report based on the provided job description and self description.
 * @access Private
 *  
 */

interviewRouter.post('/',authMiddleware.authUser,upload.single('resume'),interviewController.generateInterviewReportController);

/**
 * @routes GET /api/interview/report/:interviewId
 * @description Retrieve a specific interview report.
 * @access Private
 */
interviewRouter.get('/report/:interviewId', authMiddleware.authUser,interviewController.getInterviewReportController);


/** * @routes GET /api/interview/reports
 * @description Retrieve all interview reports for the authenticated user.
 * @access Private
 */
interviewRouter.get('/', authMiddleware.authUser,interviewController.getAllInterviewReportsController);



module.exports = interviewRouter;
