import { GoogleGenAI } from "@google/genai";
import { ClassificationResult } from "../types";

// Initialize the Gemini API client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

export const classifyImage = async (base64Data: string, mimeType: string): Promise<ClassificationResult> => {
  const ai = getAiClient();
  
  const jsonStructure = `{
  "mainCategory": "string",
  "confidence": number (0-100),
  "tags": ["string"],
  "description": "string",
  "detectedObjects": [{"name": "string", "approximateLocation": "string"}],
  "technicalDetails": {
    "lighting": "string",
    "composition": "string",
    "colorPalette": ["hex_code_string"]
  }
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: `Analyze this image efficiently. Act as an advanced computer vision model. Classify the image, identify objects, and analyze technical aspects like lighting and composition.
            
            Return the response strictly as valid JSON matching this structure:
            ${jsonStructure}
            
            Do not wrap the response in markdown code blocks (like \`\`\`json). Return raw JSON only.`,
          },
        ],
      },
      config: {
        // responseMimeType and responseSchema are not supported for gemini-2.5-flash-image
        temperature: 0.2, 
      },
    });

    let text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    // Clean up potential markdown formatting if the model adds it despite instructions
    text = text.replace(/```json\n?/g, '').replace(/```/g, '').trim();

    const result = JSON.parse(text) as ClassificationResult;
    return result;
  } catch (error) {
    console.error("Gemini Classification Error:", error);
    // Provide a more helpful error if JSON parsing fails
    if (error instanceof SyntaxError) {
       throw new Error("Failed to parse AI response. Please try again.");
    }
    throw error;
  }
};