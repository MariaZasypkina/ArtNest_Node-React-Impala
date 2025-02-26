const Gallery = require("../models/gallery");

// Update gallery item
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const galleryItem = await Gallery.findById(id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    // Check the owner
    if (galleryItem.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own artworks" });
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Artwork updated successfully", updatedGallery });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete gallery item
const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const galleryItem = await Gallery.findById(id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    // Check owner
    if (galleryItem.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own artworks" });
    }

    await Gallery.findByIdAndDelete(id);
    res.json({ message: "Artwork deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { updateGallery, deleteGallery };
