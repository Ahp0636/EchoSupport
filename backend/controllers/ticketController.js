const Ticket = require("../models/Ticket");


// GET ALL TICKETS
const getTickets = async (req, res) => {

  try {

    const tickets =
      await Ticket.find().sort({
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

      const { status } = req.body;

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


// ADD FEEDBACK
const addFeedback = async (req, res) => {

  try {

    const { feedback, rating } =
      req.body;

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
  getTickets,
  updateTicketStatus,
  addFeedback,
};