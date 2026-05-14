const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(

  {
    userIssue: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    solution: {
      type: String,
      default: "",
    },

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

module.exports = mongoose.model(
  "Ticket",
  ticketSchema
);