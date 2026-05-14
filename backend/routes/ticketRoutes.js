const express = require("express");

const router = express.Router();

const {

  createTicket,

  getTickets,

  updateTicketStatus,

  deleteTicket,

  addFeedback,

} = require(
  "../controllers/ticketController"
);


// CREATE TICKET
router.post(
  "/create",
  createTicket
);


// GET ALL TICKETS
router.get(
  "/",
  getTickets
);


// UPDATE STATUS
router.put(
  "/:id",
  updateTicketStatus
);


// DELETE TICKET
router.delete(
  "/:id",
  deleteTicket
);


// FEEDBACK
router.put(
  "/feedback/:id",
  addFeedback
);


module.exports = router;