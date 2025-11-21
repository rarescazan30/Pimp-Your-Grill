// moongose conects to mongodb
const mongoose = require("mongoose");

// async function means it can wait (await) for promises to resolve
async function connectDB() {
  try {
    // mongoose.connect() returns a promise, so we await it
    await mongoose.connect("mongodb://localhost:27017/grillapp");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
module.exports = connectDB;
