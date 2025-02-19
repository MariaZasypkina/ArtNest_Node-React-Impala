const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config");
const Gallery = require("../models/gallery");

dotenv.config();
connectDB();

const seedGallery = async () => {
  try {

    const artworks = [
      { title: "Dreamy Sunset", imageUrl: "https://images.unsplash.com/photo-1604014237744-1c332f6b060b", description: "A peaceful sunset with surreal colors.", artist: "Alice Green", mood: "serene" },
      { title: "Abstract Chaos", imageUrl: "https://images.unsplash.com/photo-1580136574531-0ef92be7009a", description: "A wild mix of shapes and colors.", artist: "John Doe", mood: "energetic" },
      { title: "Lonely Road", imageUrl: "https://images.unsplash.com/photo-1600486903741-232216008933", description: "A road that leads into the unknown.", artist: "Emma White", mood: "mysterious" },
      { title: "Underwater Dreams", imageUrl: "https://images.unsplash.com/photo-1580136574531-0ef92be7009a", description: "A deep dive into the world of imagination.", artist: "Sophia Blue", mood: "dreamy" },
      { title: "Fiery Passion", imageUrl: "https://images.unsplash.com/photo-1613574840289-36c6bd67df67", description: "Intense flames representing raw emotions.", artist: "Mike Red", mood: "passionate" },
      { title: "Ethereal Forest", imageUrl: "https://images.unsplash.com/photo-1600486903741-232216008933", description: "A mystical forest covered in fog.", artist: "Liam Brown", mood: "mystical" }
    ];

    await Gallery.insertMany(artworks);
    console.log("Artworks added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding artworks:", error);
    mongoose.connection.close();
  }
};

seedGallery();
