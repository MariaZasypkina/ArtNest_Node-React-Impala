const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: { type: String, required: true },
    mood: { type: String },
    media: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }] 
});

module.exports = mongoose.model("Artwork", artworkSchema);
