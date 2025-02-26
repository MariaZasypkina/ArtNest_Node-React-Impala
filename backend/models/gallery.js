const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Artwork title
    minlength: [3, "Title must be at least 3 characters"],
  },

  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  }, // Image URL

  description: { type: String }, // Short description of the artwork
  artist: {
    type: String,
    required: [true, "Artist name is required"],
  }, // Author name

  mood: { type: String, required: [true, "Mood is required"] }, // Mood of the artwork (e.g., happy, dark, surreal)
  
  media: { type: String, default: "Unknown" },
  
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const Gallery = mongoose.model("Gallery", gallerySchema, "galleries");

module.exports = Gallery;
