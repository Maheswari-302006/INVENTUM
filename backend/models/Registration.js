const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  event: String,
  name: String,
  rollNumber: String,
  year: String,
  branch: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Registration", registrationSchema);
