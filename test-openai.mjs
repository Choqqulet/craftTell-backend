import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a creative storyteller AI." },
        { role: "user", content: "Write a short poem about a cat." }
      ],
    });

    console.log("Success:", completion.choices[0].message);
  } catch (error) {
    console.error("OpenAI Error:", error);
  }
})();