
import { GoogleGenAI } from "@google/genai";

export async function editImageWithGemini(
  base64Image: string,
  instruction: string
): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Extract pure base64 data by removing the data URL prefix if present
  const base64Data = base64Image.includes(',') 
    ? base64Image.split(',')[1] 
    : base64Image;

  const mimeType = base64Image.includes(';') 
    ? base64Image.split(';')[0].split(':')[1] 
    : 'image/png';

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: `Follow these editing instructions precisely for this product photo: ${instruction}. If background removal is requested, ensure clean edges. If cleanup is requested, remove blemishes and shadows while preserving detail. Return the edited image.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data returned from Gemini.");
  } catch (error: any) {
    console.error("Gemini Edit Error:", error);
    throw new Error(error.message || "Failed to edit image.");
  }
}
