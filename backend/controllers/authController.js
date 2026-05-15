const User =
  require("../models/User");

const jwt =
  require("jsonwebtoken");

const bcrypt =
  require("bcryptjs");


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


      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          role: "user",
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