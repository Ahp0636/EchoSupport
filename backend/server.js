process.env.MONGODB_SKIP_SASLPREP = '1';
require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const cookieParser =
  require("cookie-parser");


const ticketRoutes =
  require("./routes/ticketRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

const authRoutes =
  require("./routes/authRoutes");


const app = express();


// MIDDLEWARE
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "*",

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],

    credentials: true,
  })
);


// ROUTES
app.use(
  "/api/tickets",
  ticketRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/auth",
  authRoutes
);


// TEST ROUTE
app.get("/", (req, res) => {

  res.send(
    "EchoSupport AI Backend Running..."
  );
});


// MONGODB CONNECTION
mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected Successfully"
  );
})

.catch((error) => {

  console.log(
    "MongoDB Connection Error:",
    error
  );
});


// SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});