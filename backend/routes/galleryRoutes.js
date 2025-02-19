const express = require("express");
const Gallery = require("../models/gallery");

const router = express.Router();

// Get random artworks for the gallery
router.get("/random", async (req, res) => {
  try {
    const count = await Gallery.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: "No artworks found" });
    }

    const randomArtworks = await Gallery.aggregate([{ $sample: { size: 6 } }]); // Get 6 random artworks
    res.json(randomArtworks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Search artworks with sorting and pagination
router.get("/search", async (req, res) => {
    try {
      const { artist, mood, description, sort, order = "asc", page = 1, limit = 6 } = req.query;
      let query = {};
  
      if (artist) query.artist = new RegExp(artist, "i");
      if (mood) query.mood = new RegExp(mood, "i");
      if (description) query.description = new RegExp(description, "i");
  
      let sortOptions = {};
      if (sort) sortOptions[sort] = order === "desc" ? -1 : 1; // Sort dynamically by any field
  
      const totalResults = await Gallery.countDocuments(query);
  
      const results = await Gallery.find(query)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      res.json({ results, totalResults });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

module.exports = router;
