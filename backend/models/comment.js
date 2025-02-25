const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    artwork: { type: mongoose.Schema.Types.ObjectId, ref: "Artwork", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
