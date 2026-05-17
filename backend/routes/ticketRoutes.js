const express =
  require("express");

const router =
  express.Router();

const protect =
  require(
    "../middleware/authMiddleware"
  );

const {

  createTicket,

  getTickets,

  updateTicketStatus,

  deleteTicket,

  addFeedback,

  addEscalationUpdate,

} = require(
  "../controllers/ticketController"
);


router.post(
  "/create",
  protect,
  createTicket
);

router.get(
  "/",
  protect,
  getTickets
);

router.put(
  "/:id",
  protect,
  updateTicketStatus
);

router.delete(
  "/:id",
  protect,
  deleteTicket
);

router.put(
  "/feedback/:id",
  protect,
  addFeedback
);

router.put(
  "/escalation/:id",
  protect,
  addEscalationUpdate
);

module.exports =
  router;
