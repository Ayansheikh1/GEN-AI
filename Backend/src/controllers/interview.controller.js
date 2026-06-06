const pdfParse = require('pdf-parse');
const interviewReportModel = require('../models/interviewReport.model');
const { generateInterviewReport } = require('../services/ai.service');

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



module.exports = { generateInterviewReportController };