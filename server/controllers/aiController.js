import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateCaptions = async (req, res) => {
  const { topic } = req.body;

  if (!topic || topic.trim() === "") {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Give me 3 catchy social media captions for a post about: ${topic}`,
      }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;

    // Split captions by newline or bullet points
    const captions = content
      .split("\n")
      .map(line => line.replace(/^\d+\.\s*|^-+\s*/, "").trim()) // remove numbering/bullets
      .filter(line => line.length > 0);

    res.status(200).json({ captions });
  } catch (err) {
    console.error("OpenAI Caption Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate captions" });
  }
};
