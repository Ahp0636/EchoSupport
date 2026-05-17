const Chat = require("../models/Chat");
const OpenAI = require("openai");

// Initialize OpenAI with OpenRouter settings
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
});

const isGreetingOrSmallTalk = (issue) => {
  const normalizedIssue = issue
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();

  const greetings = [
    "hi",
    "hii",
    "hello",
    "hey",
    "hey there",
    "good morning",
    "good afternoon",
    "good evening",
    "thanks",
    "thank you",
    "ok",
    "okay",
  ];

  return (
    greetings.includes(normalizedIssue) ||
    normalizedIssue.split(/\s+/).length <= 3 &&
      /^(hi|hii|hello|hey|thanks|thank|ok|okay)/.test(normalizedIssue)
  );
};

const buildLocalSupportResponse = (issue, previousChats = []) => {
  const normalizedIssue = issue.toLowerCase();

  if (isGreetingOrSmallTalk(issue)) {
    return {
      category: "Greeting",
      priority: "Low",
      summary: issue,
      solution:
        "Hi! Please describe the exact issue you are facing, such as payment problem, login issue, phone lagging, delivery delay, account problem, battery issue, or network problem. I will suggest practical steps first, and if those steps do not solve it, I will guide you to create a ticket with the product and company details.",
      shouldCreateTicket: false,
    };
  }

  const repeatedIssue = previousChats.some(
    (chat) => chat.userMessage.toLowerCase().trim() === normalizedIssue.trim()
  );

  let category = "General troubleshooting";
  let steps = [
    "Write down the exact error message or behavior you are seeing.",
    "Restart the affected device or app once, then try the same action again.",
    "Check whether the issue happens on another network, browser, charger, cable, or account if that is relevant.",
    "Update the app, browser, operating system, or device firmware to the latest available version.",
    "If the issue still happens, take a screenshot or short video and create a ticket with the product name, company name, purchase date, and warranty details.",
  ];

  if (normalizedIssue.includes("lag") || normalizedIssue.includes("slow") || normalizedIssue.includes("hang")) {
    category = "Phone or device lagging";
    steps = [
      "Restart the phone and wait two minutes before opening heavy apps again.",
      "Keep at least 15% storage free by deleting unused apps, large videos, duplicate downloads, or old cache.",
      "Close background apps and uninstall anything installed just before the lag started.",
      "Update the phone software and update the apps that lag the most.",
      "Clear cache for the problematic app from Settings > Apps > Storage. Do not clear app data unless you have a backup.",
      "If the phone becomes hot, remove the case, stop charging while using heavy apps, and let it cool for 10 minutes.",
      "If lag continues after these steps, create a ticket so support can check warranty, service center, or product-company escalation options.",
    ];
  } else if (normalizedIssue.includes("battery") || normalizedIssue.includes("charge")) {
    category = "Battery or charging issue";
    steps = [
      "Try a different original or certified charger and cable.",
      "Clean the charging port gently with a dry soft brush. Do not use liquid.",
      "Check battery usage settings and uninstall apps using unusual battery in the background.",
      "Restart the device and test charging for 20 minutes without using it.",
      "If charging is still unstable, create a ticket with the charger model, device model, warranty details, and a photo if possible.",
    ];
  } else if (normalizedIssue.includes("wifi") || normalizedIssue.includes("internet") || normalizedIssue.includes("network")) {
    category = "Internet or network issue";
    steps = [
      "Turn Wi-Fi or mobile data off and on, then restart the router or phone.",
      "Forget the Wi-Fi network and connect again with the correct password.",
      "Test another website/app and another device on the same network.",
      "Reset network settings if only this device has the problem.",
      "If it still fails, create a ticket with screenshots, network name, device model, and the time the issue started.",
    ];
  } else if (normalizedIssue.includes("screen") || normalizedIssue.includes("display") || normalizedIssue.includes("touch")) {
    category = "Screen or touch issue";
    steps = [
      "Remove the screen protector or case temporarily if touch is not responding properly.",
      "Clean the screen with a dry microfiber cloth.",
      "Restart the device and test touch in multiple apps.",
      "Check for software updates and reduce display refresh rate if the screen flickers.",
      "If there is physical damage, dead pixels, or repeated touch failure, create a ticket for service or company escalation.",
    ];
  }

  const repeatNote = repeatedIssue
    ? "You asked about a similar issue earlier, so here is a fresh checklist with the next practical actions."
    : "Try these steps in order. They are safe to do yourself before raising a ticket.";

  return {
    category,
    priority: normalizedIssue.includes("not working") || normalizedIssue.includes("broken") ? "High" : "Medium",
    summary: issue.length > 120 ? `${issue.slice(0, 117)}...` : issue,
    solution: `${repeatNote}\n\n${steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}`,
    shouldCreateTicket: true,
  };
};

const generateAIResponse = async (req, res) => {
  try {
    const { issue } = req.body;

    if (!issue) {
      return res.status(400).json({ success: false, message: "Issue content is required" });
    }

    const previousChats = await Chat.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(12);
    let parsedResponse = buildLocalSupportResponse(issue, previousChats);

    if (client.apiKey) {
      try {
        const completion = await client.chat.completions.create({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are an AI customer support assistant.
                If the user only greets you, thanks you, or sends small talk, do not give troubleshooting steps. Greet them and ask them to describe the issue.
                If the user describes a real problem, give practical, detailed, safe steps they can do themselves. Use chat history to avoid repeating the same wording. If the user cannot solve it, recommend creating a support ticket.
                Respond ONLY in valid JSON:
                {
                  "category": "string",
                  "priority": "Low/Medium/High",
                  "summary": "string",
                  "solution": "numbered detailed steps plus ticket recommendation when needed",
                  "shouldCreateTicket": true/false
                }`
            },
            ...[...previousChats].reverse().flatMap((chat) => [
              { role: "user", content: chat.userMessage },
              { role: "assistant", content: chat.aiMessage },
            ]),
            {
              role: "user",
              content: issue,
            },
          ],
          response_format: { type: "json_object" } 
        });

        parsedResponse = JSON.parse(completion.choices[0].message.content);
      } catch (aiError) {
        console.error("AI fallback used:", aiError.message);
      }
    }

    const newChat = await Chat.create({
      user: req.user._id,
      userMessage: issue,
      aiMessage: parsedResponse.solution || "Our team will look into this.",
    });

    res.status(200).json({
      success: true,
      aiResponse: parsedResponse,
      chat: newChat,
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

const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Get Chat History Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch chat history", error: error.message });
  }
};

module.exports = { generateAIResponse, getChatHistory };
