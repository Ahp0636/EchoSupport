const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    userIssue: String,

    category: String,

    priority: String,

    summary: String,

    solution: String,

    status: {
      type: String,
      default: "Pending",
    },

    feedback: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);