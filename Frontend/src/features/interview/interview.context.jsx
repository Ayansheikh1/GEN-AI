import { useContext,useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({children})=>{
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const[reprts,setReports] = useState([]);
    
    return (
        <InterviewContext.Provider value={{loading, setLoading, report, setReport, reports, setReports}}>
            {children}
        </InterviewContext.Provider>
    );
 }; 

