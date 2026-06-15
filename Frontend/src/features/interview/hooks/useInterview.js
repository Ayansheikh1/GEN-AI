import { generateInterviewReport, generateInterviewReportById, getAllInterviewReports } from "../services/interview.api";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        try{
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReports);
        } catch (error) {
            console.error("Error generating interview report:", error);
        } finally {
            setLoading(false);
        }
    }

    const getReportById = async (interviewId) =>{
        setLoading(true);
        try{
        const response = await generateInterviewReportById(interviewId);
            setReport(response.interviewReports);

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);

        }

        
    }

    const getReports = async () =>{
        setLoading(true);
        try{
            const response = await getAllInterviewReports();
            setReports(response.interviewReports)
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    return {generateReport,getReportById,getReports, loading,report,reports}
}


