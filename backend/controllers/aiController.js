const Ticket = require("../models/Ticket");
const OpenAI = require("openai");

// Initialize OpenAI with OpenRouter settings
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
});

const generateAIResponse = async (req, res) => {
  try {
    const { issue } = req.body;

    if (!issue) {
      return res.status(400).json({ success: false, message: "Issue content is required" });
    }

    const completion = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI customer support assistant. Respond ONLY in valid JSON format:
            {
              "category": "string",
              "priority": "Low/Medium/High",
              "summary": "string",
              "solution": "string"
            }`
        },
        {
          role: "user",
          content: issue,
        },
      ],
      // This helps newer models strictly return JSON
      response_format: { type: "json_object" } 
    });

    const aiText = completion.choices[0].message.content;

    // Safety check for parsing JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiText);
    } catch (parseError) {
      console.error("AI JSON Parse Error:", aiText);
      return res.status(500).json({ success: false, message: "AI returned invalid format" });
    }

    // SAVE TICKET TO DATABASE
    const newTicket = await Ticket.create({
      userIssue: issue,
      category: parsedResponse.category || "General",
      priority: parsedResponse.priority || "Low",
      summary: parsedResponse.summary || "No summary provided",
      solution: parsedResponse.solution || "Our team will look into this.",
    });

    res.status(200).json({
      success: true,
      aiResponse: parsedResponse,
      ticket: newTicket,
    });

  } catch (error) {
    console.error("AI Controller Error:", error.message);
    res.status(500).json({
      success: false,
      message: "AI request failed",
      error: error.message
    });
  }
};

module.exports = { generateAIResponse };