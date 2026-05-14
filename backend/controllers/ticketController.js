const Ticket = require("../models/Ticket");


// CREATE TICKET
const createTicket = async (
  req,
  res
) => {

  try {

    const {
      userIssue,
      category,
      priority,
      summary,
    } = req.body;

    const ticket =
      await Ticket.create({

        user: req.user?._id,

        userIssue,
        category,
        priority,
        summary,
      });

    res.status(201).json({

      success: true,
      ticket,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL TICKETS
const getTickets = async (
  req,
  res
) => {

  try {

    const tickets =
      await Ticket.find()
      .sort({
        createdAt: -1,
      });

    res.status(200).json({

      success: true,
      tickets,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE STATUS
const updateTicketStatus =
  async (req, res) => {

    try {

      const { status } =
        req.body;

      const updatedTicket =
        await Ticket.findByIdAndUpdate(

          req.params.id,

          {
            status,
          },

          {
            new: true,
          }
        );

      res.status(200).json({

        success: true,
        updatedTicket,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };


// DELETE TICKET
const deleteTicket =
  async (req, res) => {

    try {

      await Ticket.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,
        message:
          "Ticket deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };


// ADD FEEDBACK
const addFeedback =
  async (req, res) => {

    try {

      const {
        feedback,
        rating,
      } = req.body;

      const updatedTicket =
        await Ticket.findByIdAndUpdate(

          req.params.id,

          {
            feedback,
            rating,
          },

          {
            new: true,
          }
        );

      res.status(200).json({

        success: true,
        updatedTicket,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };


module.exports = {

  createTicket,

  getTickets,

  updateTicketStatus,

  deleteTicket,

  addFeedback,
};