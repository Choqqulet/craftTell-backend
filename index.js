const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend is alive");
});

app.post("/generate-story", async (req, res) => {
  console.log("Received request:", req.body);

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a creative storyteller AI." },
        { role: "user", content: `Write a short illustrated story about: ${prompt}` },
      ],
    });

    const story = completion.choices[0].message.content;
    console.log("Generated story:", story);
    res.json({ story });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5050, () => console.log("Server running on port 5050"));