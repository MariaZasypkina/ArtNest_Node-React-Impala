// backend/seedGallery.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config");
const Gallery = require("../models/gallery");

dotenv.config();
connectDB();

const seedGallery = async () => {
  try {
    // Clear the gallery collection
    await Gallery.deleteMany();
    console.log("Old artworks removed.");

    // Array of new artworks with media field
    const artworks = [
      {
          title: "Golden Hour",
          artist: "Olivia Gold",
          imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
          description: "The warm glow of sunset.",
          mood: "warm",
          media: "Oil on Canvas"
      },
      {
          title: "Urban Graffiti",
          artist: "Banksy Jr.",
          imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb",
          description: "A wall full of vibrant street art.",
          mood: "rebellious",
          media: "Spray Paint"
      },
      {
          title: "Midnight Reflections",
          artist: "Noah Dark",
          imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
          description: "A quiet lake under the moonlight.",
          mood: "calm",
          media: "Watercolor"
      },
      {
          title: "Vivid Dreams",
          artist: "Mira Lune",
          imageUrl: "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc",
          description: "A mix of colors and surreal shapes.",
          mood: "imaginative",
          media: "Digital"
      },
      {
          title: "Mystical Glade",
          artist: "Elena Myst",
          imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
          description: "A hidden forest path glowing with magic.",
          mood: "enchanted",
          media: "Oil on Canvas"
      },
      {
          title: "Celestial Reflections",
          artist: "Stella Nova",
          imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
          description: "Galaxies reflected in water.",
          mood: "cosmic",
          media: "Mixed Media"
      },
      {
          title: "Abstract Chaos",
          artist: "John Doe",
          imageUrl: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3",
          description: "A wild mix of shapes and colors.",
          mood: "energetic",
          media: "Acrylic"
      },
      {
          title: "Lonely Road",
          artist: "Emma White",
          imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
          description: "A road that leads into the unknown.",
          mood: "mysterious",
          media: "Watercolor"
      },
      {
          title: "Underwater Dreams",
          artist: "Sophia Blue",
          imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
          description: "A deep dive into the world of imagination.",
          mood: "dreamy",
          media: "Digital"
      },
      {
          title: "Fiery Passion",
          artist: "Mike Red",
          imageUrl: "https://images.unsplash.com/photo-1516273638577-0d7a6ec3d252",
          description: "Intense flames representing raw emotions.",
          mood: "passionate",
          media: "Oil on Canvas"
      }
  ];
  

    // Insert new artworks into the database
    await Gallery.insertMany(artworks);
    console.log("Artworks added successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding artworks:", error);
    mongoose.connection.close();
  }
};

seedGallery();
