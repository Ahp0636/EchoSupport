require("dotenv").config();
process.env.MONGODB_SKIP_SASLPREP = "1";

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const ticketRoutes = require("./routes/ticketRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(
  cors({
    origin: corsOrigin === "*" ? true : corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);

app.use("/api/tickets", ticketRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("EchoSupport AI Backend Running...");
});

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing. Set it in backend/.env or hosting env vars.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
