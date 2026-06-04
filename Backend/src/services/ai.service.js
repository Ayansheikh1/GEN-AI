const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function invokeGeminiAi() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:"hello gemini, what is interview?"});
    console.log("Gemini AI response:", response.text);
}

module.exports = {
    invokeGeminiAi
};
   