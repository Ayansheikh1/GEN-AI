import axios from "axios";

const api = axios.create({
    baseURL:  "http://localhost:3000",
    withCredentials: true,
});


/**
 * Generate an interview report based on the provided job description, self description, and resume file.
 * @param {Object} params - The parameters for generating the interview report.
 * @param {string} params.jobDescription - The job description for which the interview report is to be generated.
 * @param {string} params.selfDescription - A self-description to help tailor the interview report.
 * @param {File} params.resumeFile - The resume file to be uploaded and analyzed for the interview report.
 * @returns {Promise<Object>} The generated interview report data from the server.
 */

export const generateInterviewReport = async ({jobDescription,selfDescription,resumeFile})=>{
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}


/** * Retrieve a specific interview report by its ID.
 * @param {string} interviewId - The ID of the interview report to retrieve.
 * @returns {Promise<Object>} The interview report data from the server.
 */ 
export const generateInterviewReportById = async (interviewId)=>{
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
}


/** * Retrieve all interview reports for the authenticated user.
 * @returns {Promise<Array>} An array of interview report data from the server.
 */ 
export const getAllInterviewReports = async()=>{
    const response = await api.get("/api/interview/");
    return response.data;
}