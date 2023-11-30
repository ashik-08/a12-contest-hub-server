const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME });
    console.log(`Connected to the database ${process.env.DB_NAME}`);
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

module.exports = connectDB;
