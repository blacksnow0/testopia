const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/testopia");
    console.log("Connected to the TESTOPIA database!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    process.exit(1);
  }
};

module.exports = connectDb;
