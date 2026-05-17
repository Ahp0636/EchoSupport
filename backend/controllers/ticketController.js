const Ticket =
  require("../models/Ticket");


// CREATE
const createTicket =
  async (req, res) => {

    try {

      const {
        userIssue,
        category,
        priority,
        summary,
        companyName,
        companyEmail,
        productName,
      } = req.body;


      const ticket =
        await Ticket.create({

          user:
            req.user._id,

          userIssue,

          category,

          priority,

          summary,

          companyName,

          companyEmail,

          productName,
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


// USER TICKETS
const getTickets =
  async (req, res) => {

    try {

      let tickets;

      if (
        req.user.role ===
        "admin"
      ) {

        tickets =
          await Ticket.find()

          .populate(
            "user",
            "name email role"
          )

          .sort({
            createdAt: -1,
          });

      } else {

        tickets =
          await Ticket.find({

            user:
              req.user._id,
          })

          .populate(
            "user",
            "name email"
          )

          .sort({
            createdAt: -1,
          });
      }


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

      const allowedStatuses = [
        "Pending",
        "In Progress",
        "Completed Successfully",
        "Solved",
      ];

      if (
        !allowedStatuses.includes(
          req.body.status
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid ticket status",
        });
      }

      const updatedTicket =
        await Ticket.findByIdAndUpdate(

          req.params.id,

          {
            status:
              req.body.status,
          },

          {
            new: true,
          }
        ).populate(
          "user",
          "name email role"
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


// DELETE
const deleteTicket =
  async (req, res) => {

    try {

      await Ticket.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "Ticket deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };


// FEEDBACK
const addFeedback =
  async (req, res) => {

    try {

      const updatedTicket =
        await Ticket.findByIdAndUpdate(

          req.params.id,

          {
            feedback:
              req.body.feedback,

            rating:
              req.body.rating,
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
