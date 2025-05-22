const axios = require("axios");
const { getTodos } = require("./db");
const { sendToSlack } = require("./slack");

async function summarizeAndSend() {
  try {
    const todos = await getTodos();

    if (!todos.length) {
      throw new Error("No todos to summarize.");
    }

    const todoText = todos.map((t) => t.text).join(", ");

    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command-light",
        prompt: `Summarize the following tasks: ${todoText}`,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.generations[0].text.trim();
    await sendToSlack(summary);
  
    return summary;
  } catch (err) {
    console.error("❌ Error in summarizeAndSend:", err.response?.data || err.message || err);
    throw new Error("Failed to generate summary with Cohere.");
  }
}

module.exports = { summarizeAndSend };
