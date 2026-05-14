const express = require("express");

const router = express.Router();

const {
  getTickets,
  updateTicketStatus,
  addFeedback,
} = require("../controllers/ticketController");


// GET
router.get("/", getTickets);


// UPDATE STATUS
router.put(
  "/:id",
  updateTicketStatus
);


// FEEDBACK
router.put(
  "/feedback/:id",
  addFeedback
);

module.exports = router;