const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
  text: { type: String, required: true }, // The tip content
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const Tip = mongoose.model("Tip", tipSchema);

module.exports = Tip;
