import { generateInterviewReport, generateInterviewReportById, getAllInterviewReports } from "../services/interview.api";
import { InterviewContext } from "../interview.context";
import { useContext } from "react";
import { useParams } from "react-router";

export const useInterview = () => {
    const context = useContext(InterviewContext)
    

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    try {
        const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
        console.log("✅ API response:", response);
        setReport(response.interviewReport);
        return response.interviewReport;
    } catch (error) {
        // ✅ this shows the actual backend error message
        console.error("❌ Full error:", error.response?.data);
        console.error("❌ Status:", error.response?.status);
        console.error("❌ Message:", error.message);
    } finally {
        setLoading(false);
    }
}

    const getReportById = async (interviewId) =>{
        setLoading(true);
        let response = null;
        try{
         response = await generateInterviewReportById(interviewId);
            setReport(response.interviewReport);

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);

        }
        return response.interviewReport

        
    }

    const getReports = async () =>{
        setLoading(true);
        let response = null;
        try{
             response = await getAllInterviewReports();
            setReports(response.interviewReport)
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }

        return response.interviewReport
    }

    return {generateReport,getReportById,getReports, loading,report,reports}
}


