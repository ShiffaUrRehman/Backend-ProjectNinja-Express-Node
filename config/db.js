const mongoose = require("mongoose");

const DB_URL_LOCAL = "mongodb://127.0.0.1:27017/projectNinja";
// DB connection function separated in a module
const connectDB = () => {
  mongoose
    .connect(DB_URL_LOCAL)
    .then(() => console.log("Connected to DB successfully"))
    .catch((err) => console.log("Error while connecting to DB", err.message));
};

module.exports.connectDB = connectDB;
