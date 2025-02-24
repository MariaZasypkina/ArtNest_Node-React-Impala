const express = require("express");
const Gallery = require('../models/gallery')

const router = express.Router();

// Get artworks with search and pagination
router.get("/search", async (req, res) => {
    const { artist, mood, description, media, page = 1, limit = 6 } = req.query;

    console.log("👉 Received query:", req.query);

    // Build search query based on provided filters
const query = {};
if (artist && artist.trim()) query.artist = { $regex: artist, $options: "i" };
if (mood && mood.trim()) query.mood = { $regex: mood, $options: "i" };
if (description && description.trim()) query.description = { $regex: description, $options: "i" };
if (media && media.trim()) query.media = { $regex: media, $options: "i" };

// Log the final query for debugging
console.log("👉 Final query for MongoDB:", query);

try {
    // Fetch artworks from MongoDB based on query
    const artworks = await Gallery.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    console.log("✅ Fetched artworks:", artworks);

    // Count total results for pagination
    const count = await Gallery.countDocuments(query);

    // Send the results to the client
    res.json({
        results: artworks,
        totalResults: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    });
} catch (error) {
    console.error("❌ Failed to fetch artworks:", error);
    res.status(500).json({ message: "Failed to fetch artworks" });
}
});

module.exports = router;

