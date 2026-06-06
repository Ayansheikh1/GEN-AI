const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

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
    }))
});

async function generateInterviewReport(resume, jobDescription, selfDescription) {

    // ✅ Embed schema directly in system instruction
    const systemInstruction = `You are an expert technical interviewer.
You MUST respond with ONLY a raw JSON object — no markdown, no explanation, no extra fields.
The JSON object MUST have EXACTLY these top-level keys:
- "matchScore": a number (0-100)
- "technicalQuestions": array of objects with keys: question, intention, answer
- "behavioralQuestions": array of objects with keys: question, intention, answer  
- "skillGaps": array of objects with keys: skill, severity (must be "low", "medium", or "high")
- "preparationPlan": array of objects with keys: day (number), focus, task (array of strings)

Example of required format:
${JSON.stringify({
    matchScore: 85,
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

module.exports = { generateInterviewReport };