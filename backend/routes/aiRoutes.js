const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Debug log to confirm route loading in Render logs
console.log("📍 AI Routes Initialized");

const { generateAIResponse, getChatHistory } = require("../controllers/aiController");

// POST /api/ai/
router.post("/", protect, generateAIResponse);

// GET /api/ai/history
router.get("/history", protect, getChatHistory);

module.exports = router;