const express = require("express");

const router = express.Router();

const { generateAIResponse } = require("../controllers/aiController");

router.post("/", generateAIResponse);

module.exports = router;