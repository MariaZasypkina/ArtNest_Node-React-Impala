const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true }, // Artwork title
  imageUrl: { type: String, required: true }, // Image URL
  description: { type: String }, // Short description of the artwork
  artist: { type: String, required: true }, // Author name
  mood: { type: String }, // Mood of the artwork (e.g., happy, dark, surreal)
  createdAt: { type: Date, default: Date.now } // Timestamp
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
