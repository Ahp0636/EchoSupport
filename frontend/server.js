require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ticketRoutes = require("./routes/ticketRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());

app.use(cookieParser());


// Routes
app.use("/api/tickets", ticketRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("EchoSupport AI Backend Running...");
});


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log(
      "MongoDB Connection Error:",
      error
    );
  });


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});