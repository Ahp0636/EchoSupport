const Ticket = require("../models/Ticket");

const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const generateAIResponse = async (req, res) => {

  try {

    const { issue } = req.body;

    const completion =
      await client.chat.completions.create({

        model: "openai/gpt-3.5-turbo",

        messages: [

          {
            role: "system",

            content: `
            You are an AI customer support assistant.

            Always respond ONLY in this JSON format:

            {
              "category": "",
              "priority": "",
              "summary": "",
              "solution": ""
            }

            Priority must only be:
            Low / Medium / High
            `,
          },

          {
            role: "user",
            content: issue,
          },
        ],
      });

    const aiText =
      completion.choices[0].message.content;

    const parsedResponse =
      JSON.parse(aiText);


    // SAVE TICKET TO DATABASE
    const newTicket =
      await Ticket.create({

        userIssue: issue,

        category:
          parsedResponse.category,

        priority:
          parsedResponse.priority,

        summary:
          parsedResponse.summary,

        solution:
          parsedResponse.solution,

      });


    res.status(200).json({
      success: true,

      aiResponse: parsedResponse,

      ticket: newTicket,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI request failed",
    });
  }
};

module.exports = {
  generateAIResponse,
};