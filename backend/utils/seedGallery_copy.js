const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config");
const Gallery = require("../models/gallery");

dotenv.config();
connectDB();

const seedGallery = async () => {
  try {

    const artworks = [
      {
        title: "Echoes of Silence",
        imageUrl: "https://images.unsplash.com/photo-1513357070577-9d0b5d3f8788",
        description: "A hauntingly beautiful scene of isolation and calm.",
        artist: "Samantha Rose",
        mood: "peaceful",
        media: "Oil on Canvas"
      },
      {
        title: "Golden Fields",
        imageUrl: "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
        description: "Sun-drenched fields stretching to the horizon.",
        artist: "Olivia Clarke",
        mood: "serene",
        media: "Watercolor on Paper"
      },
      {
        title: "Fractal Dreams",
        imageUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698",
        description: "An abstract representation of dreams in vibrant colors.",
        artist: "Ethan Brooks",
        mood: "vibrant",
        media: "Digital Art"
      },
      {
        title: "Neon Rush",
        imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
        description: "Bright neon lights flashing through the city.",
        artist: "Maya Lopez",
        mood: "energetic",
        media: "Acrylic on Canvas"
      },
      {
        title: "Serenity of Snow",
        imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        description: "Soft white snow covering a silent landscape.",
        artist: "Lucas Bennett",
        mood: "peaceful",
        media: "Oil on Canvas"
      },
      {
        title: "Forest Secrets",
        imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        description: "Sunlight filtering through dense forest leaves.",
        artist: "Harper Wells",
        mood: "mysterious",
        media: "Watercolor on Paper"
      },
      {
        title: "Rhythm of Colors",
        imageUrl: "https://images.unsplash.com/photo-1526122407030-2b77e37066ad",
        description: "Dynamic splashes of color creating a vibrant scene.",
        artist: "Ava Reed",
        mood: "vibrant",
        media: "Acrylic on Canvas"
      },
      {
        title: "Silent Observer",
        imageUrl: "https://images.unsplash.com/photo-1530089718390-7c6d1d9f25f3",
        description: "A lone figure watching the world in silence.",
        artist: "Noah Scott",
        mood: "melancholic",
        media: "Charcoal on Paper"
      },
      {
        title: "Pastel Morning",
        imageUrl: "https://images.unsplash.com/photo-1523906630133-f6934a1ab1b4",
        description: "Soft pastel colors painting the early sky.",
        artist: "Emma Gray",
        mood: "dreamy",
        media: "Digital Art"
      },
      {
        title: "Shadows and Light",
        imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
        description: "A play of light and shadow across the canvas.",
        artist: "Liam Cooper",
        mood: "bold",
        media: "Oil on Canvas"
      },
      {
        title: "Blush of Dawn",
        imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
        description: "Soft pink hues filling the sky at sunrise.",
        artist: "Samantha Rose",
        mood: "peaceful",
        media: "Watercolor on Paper"
      },
      {
        title: "City Pulse",
        imageUrl: "https://images.unsplash.com/photo-1535905557558-e84f4f6c4dc3",
        description: "The heart of the city beating with lights and movement.",
        artist: "Maya Lopez",
        mood: "energetic",
        media: "Acrylic on Canvas"
      },
      {
        title: "Abstract Horizons",
        imageUrl: "https://images.unsplash.com/photo-1516460311268-4f034858e0af",
        description: "Blurry lines of the horizon in abstract form.",
        artist: "Ethan Brooks",
        mood: "thoughtful",
        media: "Digital Art"
      },
      {
        title: "Lavender Dreams",
        imageUrl: "https://images.unsplash.com/photo-1536766768598-e09213fdcf22",
        description: "Soft purple fields under a twilight sky.",
        artist: "Emma Gray",
        mood: "dreamy",
        media: "Watercolor on Paper"
      },
      {
        title: "Golden Silence",
        imageUrl: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1",
        description: "Golden rays breaking through the silent forest.",
        artist: "Lucas Bennett",
        mood: "serene",
        media: "Oil on Canvas"
      },
      {
        title: "Line of Thought",
        imageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744",
        description: "Minimalist line art exploring human emotions.",
        artist: "Harper Wells",
        mood: "minimalistic",
        media: "Ink on Paper"
      },
      {
        title: "Pulse of the Night",
        imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
        description: "Nightlife captured in vibrant neon shades.",
        artist: "Ava Reed",
        mood: "vibrant",
        media: "Acrylic on Canvas"
      },
      {
        title: "Tranquil Waters",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        description: "Still water reflecting the calmness of the mind.",
        artist: "Samantha Rose",
        mood: "peaceful",
        media: "Oil on Canvas"
      },
      {
        title: "Hidden Realms",
        imageUrl: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6",
        description: "A surreal view into unknown worlds.",
        artist: "Harper Wells",
        mood: "mysterious",
        media: "Digital Art"
      },
      {
        title: "Bold Strokes",
        imageUrl: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
        description: "Strong brushstrokes creating a powerful impression.",
        artist: "Liam Cooper",
        mood: "bold",
        media: "Oil on Canvas"
      }
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
