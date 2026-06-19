const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require('puppeteer');

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A percentage score (0-100) of how well the candidate matches the job."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("A technical interview question."),
        intention: z.string().describe("Why this question is asked."),
        answer: z.string().describe("How to answer effectively.")
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("A behavioral interview question."),
        intention: z.string().describe("Why this question is asked."),
        answer: z.string().describe("How to answer effectively.")
    })),
    skillGaps: z.array(z.object({
        skill: z.string().describe("A skill the candidate is lacking."),
        severity: z.enum(["low", "medium", "high"]).describe("How critical the gap is.")
    })),
    preparationPlan: z.array(z.object({
        day: z.number().describe("Day number in the plan."),
        focus: z.string().describe("Main topic for the day."),
        task: z.array(z.string()).describe("List of tasks for the day.")
    })),
    title: z.string().describe("The title of the job for which the interview report is generated.")
});



async function generateInterviewReport(resume, jobDescription, selfDescription) {

    // ✅ Embed schema directly in system instruction
    const systemInstruction = `You are an expert technical interviewer.
You MUST respond with ONLY a raw JSON object — no markdown, no explanation, no extra fields.
The JSON object MUST have EXACTLY these top-level keys:
- "matchScore": a number (0-100)
- "title": the job title for which this interview report is generated (e.g. "Frontend Developer")
- "technicalQuestions": array of objects with keys: question, intention, answer
- "behavioralQuestions": array of objects with keys: question, intention, answer  
- "skillGaps": array of objects with keys: skill, severity (must be "low", "medium", or "high")
- "preparationPlan": array of objects with keys: day (number), focus, task (array of strings)

Example of required format:
${JSON.stringify({
    matchScore: 85,
    title: "MERN Stack Developer",   // ✅ added to example
    technicalQuestions: [{ question: "...", intention: "...", answer: "..." }],
    behavioralQuestions: [{ question: "...", intention: "...", answer: "..." }],
    skillGaps: [{ skill: "...", severity: "medium" }],
    preparationPlan: [{ day: 1, focus: "...", task: ["...", "..."] }]
}, null, 2)}`;

    const prompt = `Analyze this candidate and generate the interview report JSON.

Resume: ${resume}
Job Description: ${jobDescription}
Self Description: ${selfDescription}`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            thinkingConfig: { thinkingBudget: 0 }
        }
    });

   

    // Strip markdown fences if still present
    const raw = response.text.replace(/```json\n?|\n?```/g, "").trim();

    const interviewReport = interviewReportSchema.parse(JSON.parse(raw));

    return interviewReport;
}

async function generatePDfFromHtml(htmlContent){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent,{waitUntil:"networkidle2"});

    const pdfBuffer = await page.pdf({
        format:"A4",
        margin:{
            top:"20mm",
            bottom:"20mm",
            left:"15mm",
            right:"15mm"
        }
    })

    await browser.close();

    return pdfBuffer
}


async function generateResumePdf({ resume, jobDescription, selfDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe('The HTML content of resume tailored for the job description')
    });

    const systemInstruction = `You are an expert resume writer. Your job is to:
1. Analyze the job description and identify key skills, technologies, and requirements
2. Reorder and emphasize the candidate's experience to highlight what matches the job
3. Rewrite bullet points to use keywords from the job description
4. Modify technical skills section to prioritize relevant technologies
5. Adjust project descriptions to highlight work relevant to this specific role
6. Keep the overall structure professional but make every section job-specific

You MUST respond with ONLY valid JSON containing a single "html" field.`;

    const prompt = `You are rewriting a resume to be tailored for a specific job.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF DESCRIPTION:
${selfDescription}

TARGET JOB DESCRIPTION:
${jobDescription}

TASK:
1. Identify the top 5 skills/technologies required by the job description
2. Reorder the candidate's experience to lead with the most relevant positions
3. Rewrite bullet points to match the job's language and keywords
4. Emphasize technologies and projects that align with this specific role
5. Modify technical skills to highlight tools/languages mentioned in the job description
6. Create ATS-friendly HTML with semantic tags (no fancy CSS, just clean structure)

Generate the tailored resume as clean, professional HTML. Focus on matching keywords and highlighting relevant experience.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            thinkingConfig: { thinkingBudget: 0 }
        }
    });

    const raw = response.text.replace(/```json\n?|\n?```/g, "").trim();
    const jsonContent = resumePdfSchema.parse(JSON.parse(raw));
    const pdfBuffer = await generatePDfFromHtml(jsonContent.html);

    return pdfBuffer;
}



module.exports = { generateInterviewReport, generateResumePdf };