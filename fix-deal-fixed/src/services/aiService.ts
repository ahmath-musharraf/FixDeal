import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const generateAdDescription = async (title: string, category: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a professional marketplace ad writer. 
      Generate a compelling, structured, and SEO-friendly ad description for the following item:
      Item Title: ${title}
      Category: ${category}
      
      The description should include:
      - A catchy opening
      - Key features and specifications
      - Condition (leave placeholders like [Condition] if not known)
      - A clear call to action
      
      Keep it concise but persuasive. Format with bullet points where appropriate.`,
    });

    return response.text;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate description. Please try again.");
  }
};
