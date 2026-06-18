const pdfParse = require('pdf-parse');
const interviewReportModel = require('../models/interviewReport.model');
const { generateInterviewReport, generateResumePdf } = require('../services/ai.service');


/** 
 * @desc Generate an interview report based on the provided job description and self description.
 * @route POST /api/interview
 * @access Private
 */

async function generateInterviewReportController(req, res) {
  

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const {jobDescription,selfDescription} =req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent.text,
        jobDescription,
        selfDescription
    });

    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        jobDescription,
        selfDescription,
        ...interviewReportByAi

    });
    res.status(201).json({
        message:"interview report generated sucessfully",
        interviewReport
        
    })

}

/**
 * @desc Retrieve a specific interview report.
 * @route GET /api/interview/report/:interviewId
 * @access Private
 */
async function getInterviewReportController(req,res){
const {interviewId} = req.params;

const interviewReport = await interviewReportModel.findOne({_id:interviewId,user:req.user.id});

if(!interviewReport){
    return res.status(404).json({message:"Interview report not found"});
}

res.status(200).json({
    message:"Interview report retrieved successfully",
    interviewReport
})
}

/**
 * @desc Retrieve all interview reports for the authenticated user.
 * @route GET /api/interview/reports
 */

async function getAllInterviewReportsController(req,res){
    const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select(
  "-resume -jobDescription -selfDescription -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -__v"); // Exclude sensitive content for listing
    res.status(200).json({
        message:"Interview reports retrieved successfully",
        interviewReports
    });
}

async function generateResumePdfController(req,res){
    const {interviewReportId} = req.params

      const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }
    

    const {resume,jobDescription,selfDescription} = interviewReport

    const pdfBuffer = await generateResumePdf({resume,jobDescription,selfDescription});

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer);
}

module.exports = { generateInterviewReportController,getInterviewReportController,getAllInterviewReportsController,generateResumePdfController };