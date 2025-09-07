const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  console.log(mongoURI);
  if (!mongoURI) throw new Error("MONGODB_URI not set ");
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
      throw err;
    });
};

module.exports = connectDB;
