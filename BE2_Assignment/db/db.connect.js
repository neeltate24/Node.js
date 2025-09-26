const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

async function initializeDatabase() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}

module.exports = { initializeDatabase };
