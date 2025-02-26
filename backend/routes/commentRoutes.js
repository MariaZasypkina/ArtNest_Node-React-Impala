const express = require("express");
const Comment = require("../models/comment");

const Artwork = require("../models/artwork")

const router = express.Router();

// Get comments for the artwork
router.get("/:artworkId", async (req, res) => {
    try {
        const comments = await Comment.find({ artwork: req.params.artworkId });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch comments" });
    }
});

// Add comment
router.post("/", async (req, res) => {
    const { artworkId, text } = req.body;
    try {
        const newComment = new Comment({ artwork: artworkId, text });
        await newComment.save();

        // Refresh (adding link to the comment)
        await Artwork.findByIdAndUpdate(artworkId, { $push: { comments: newComment._id } });

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Failed to add comment" });
    }
});

module.exports = router;
