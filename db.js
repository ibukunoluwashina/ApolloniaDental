// create a database connection

const mongoose = require("mongoose");
require("dotenv").config();
// const dbURI = process.env.DB_URI || "mongodb://localhost:27017/mydatabase
const dbURI = process.env.DB_URI || "mongodb://localhost:27017/mydatabase";
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully...");
  } catch (error) {
    console.error("MongoDB connetion error:", error);
    process.exit(1); /* exit with failure */
  }
};

// Export the connection function
module.exports = connectDB;
