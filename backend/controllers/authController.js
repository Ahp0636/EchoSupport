const User =
  require("../models/User");

const jwt =
  require("jsonwebtoken");

const bcrypt =
  require("bcryptjs");

const getUserRole = (email) => {

  const adminEmails =
    (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((adminEmail) =>
        adminEmail.trim().toLowerCase()
      )
      .filter(Boolean);

  return adminEmails.includes(
    email.toLowerCase()
  )
    ? "admin"
    : "user";
};

const registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;


      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            "User already exists",
        });
      }


      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const role =
        getUserRole(email);

      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          role,
        });


      const token =
        jwt.sign(

          {
            id: user._id,
          },

          "SECRETKEY",

          {
            expiresIn: "7d",
          }
        );


      res.status(201).json({

        success: true,

        token,

        user,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };


const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;


      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid Email",
        });
      }


      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid Password",
        });
      }

      const expectedRole =
        getUserRole(email);

      if (
        expectedRole === "admin" &&
        user.role !== "admin"
      ) {

        user.role = "admin";

        await user.save();
      }

      const token =
        jwt.sign(

          {
            id: user._id,
          },

          "SECRETKEY",

          {
            expiresIn: "7d",
          }
        );


      res.status(200).json({

        success: true,

        token,

        user,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };


module.exports = {

  registerUser,

  loginUser,
};
