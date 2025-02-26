const express = require("express");
const Gallery = require('../models/gallery');
const { updateGallery, deleteGallery } = require("../controllers/galleryController"); // Импорт контроллера
const authMiddleware = require("../middleware/auth");


const router = express.Router();

router.get("/search", async (req, res) => {
    const { artist, mood, description, media, page = 1, limit = 6, sort = "createdAt", order = "asc" } = req.query;
    const sortField = sort.trim() ? sort : "createdAt";  
    const sortOrder = order === "desc" ? -1 : 1;

    console.log(`👉 Sorting by: ${sortField}, order: ${sortOrder}`);

    // Build search query based on provided filters
    const query = {};
    if (artist && artist.trim()) query.artist = { $regex: artist, $options: "i" };
    if (mood && mood.trim()) query.mood = { $regex: mood, $options: "i" };
    if (description && description.trim()) query.description = { $regex: description, $options: "i" };
    if (media && media.trim()) query.media = { $regex: media, $options: "i" };

    console.log("👉 Final query for MongoDB:", query);

    try {
        const artworks = await Gallery.find(query)
            .sort({ [sortField]: sortOrder })  
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        console.log("✅ Fetched artworks:", artworks);

        const count = await Gallery.countDocuments(query);

        res.json({
            results: artworks,
            totalResults: count,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        console.error("❌ Failed to fetch artworks:", error);
        res.status(500).json({ message: "Failed to fetch artworks" });
    }
});

router.put("/:id", authMiddleware, updateGallery);

router.delete("/:id", authMiddleware, deleteGallery);

module.exports = router;
