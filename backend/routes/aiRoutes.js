const express = require("express");
const router = express.Router();

// Debug log to confirm route loading in Render logs
console.log("📍 AI Routes Initialized");

const { generateAIResponse } = require("../controllers/aiController");

// POST /api/ai/
router.post("/", generateAIResponse);

module.exports = router;