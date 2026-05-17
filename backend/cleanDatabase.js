require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const cleanOldUsers = async () => {
  if (!process.env.MONGO_URI) {
    console.log("Error: No MONGO_URI found in backend/.env");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // Delete users with plain text passwords (the ones you created yesterday)
    const result = await User.deleteMany({ password: { $not: /^\$2[aby]\$/ } });
    
    console.log(`Successfully deleted ${result.deletedCount} old plain-text users!`);
    console.log("Your database is now clean. You can register a new user on Vercel.");
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

cleanOldUsers();
