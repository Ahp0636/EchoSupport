const mongoose = require("mongoose");

const ticketSchema =
  new mongoose.Schema(

    {

      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

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

      companyName: {
        type: String,
        default: "",
      },

      companyEmail: {
        type: String,
        default: "",
      },

      companyPhone: {
        type: String,
        default: "",
      },

      companyWhatsApp: {
        type: String,
        default: "",
      },

      productName: {
        type: String,
        default: "",
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

      escalationUpdates: [
        {
          note: {
            type: String,
            required: true,
          },

          status: {
            type: String,
            default: "Company Follow-up",
          },

          addedBy: {
            type: String,
            default: "Admin",
          },

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Ticket",
    ticketSchema
  );
