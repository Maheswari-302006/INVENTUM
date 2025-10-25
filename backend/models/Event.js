const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  fee: Number,
  date: String,
  prize: String
});

module.exports = mongoose.model("Event", eventSchema);
