const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config");
const Gallery = require("../models/gallery");

dotenv.config();
connectDB();

const seedGallery = async () => {
  try {
    await Gallery.deleteMany(); // Clear the gallery collection
    console.log("Old artworks removed.");

    const artworks = [
      { title: "Dreamy Sunset", imageUrl: "https://source.unsplash.com/600x400/?sunset,art", description: "A peaceful sunset with surreal colors.", artist: "Alice Green", mood: "serene" },
      { title: "Abstract Chaos", imageUrl: "https://source.unsplash.com/600x400/?abstract,art", description: "A wild mix of shapes and colors.", artist: "John Doe", mood: "energetic" },
      { title: "Lonely Road", imageUrl: "https://source.unsplash.com/600x400/?road,art", description: "A road that leads into the unknown.", artist: "Emma White", mood: "mysterious" },
      { title: "Underwater Dreams", imageUrl: "https://source.unsplash.com/600x400/?underwater,art", description: "A deep dive into the world of imagination.", artist: "Sophia Blue", mood: "dreamy" },
      { title: "Fiery Passion", imageUrl: "https://source.unsplash.com/600x400/?fire,art", description: "Intense flames representing raw emotions.", artist: "Mike Red", mood: "passionate" },
      { title: "Ethereal Forest", imageUrl: "https://source.unsplash.com/600x400/?forest,art", description: "A mystical forest covered in fog.", artist: "Liam Brown", mood: "mystical" },
      { title: "Celestial Reflections", imageUrl: "https://source.unsplash.com/600x400/?space,art", description: "Galaxies reflected in water.", artist: "Stella Nova", mood: "cosmic" },
      { title: "Golden Hour", imageUrl: "https://source.unsplash.com/600x400/?goldenhour,art", description: "The warm glow of sunset.", artist: "Olivia Gold", mood: "warm" },
      { title: "Urban Graffiti", imageUrl: "https://source.unsplash.com/600x400/?graffiti,art", description: "A wall full of vibrant street art.", artist: "Banksy Jr.", mood: "rebellious" },
      { title: "Midnight Reflections", imageUrl: "https://source.unsplash.com/600x400/?night,art", description: "A quiet lake under the moonlight.", artist: "Noah Dark", mood: "calm" },
      { title: "Vivid Dreams", imageUrl: "https://source.unsplash.com/600x400/?dreams,art", description: "A mix of colors and surreal shapes.", artist: "Mira Lune", mood: "imaginative" },
      { title: "Mystical Glade", imageUrl: "https://source.unsplash.com/600x400/?glade,art", description: "A hidden forest path glowing with magic.", artist: "Elena Myst", mood: "enchanted" },
      { title: "Neon Waves", imageUrl: "https://source.unsplash.com/600x400/?neon,art", description: "Bright neon patterns shifting in waves.", artist: "Dylan Flux", mood: "vibrant" },
      { title: "Silent Observers", imageUrl: "https://source.unsplash.com/600x400/?statue,art", description: "Ancient statues standing in the mist.", artist: "Henry Stone", mood: "timeless" },
      { title: "Cosmic Dancer", imageUrl: "https://source.unsplash.com/600x400/?dancer,art", description: "A dancer surrounded by cosmic dust.", artist: "Ava Star", mood: "graceful" },
      { title: "Stormy Mind", imageUrl: "https://source.unsplash.com/600x400/?storm,art", description: "Dark clouds forming a human face.", artist: "Xavier Storm", mood: "intense" },
      { title: "Digital Rain", imageUrl: "https://source.unsplash.com/600x400/?cyberpunk,art", description: "A city drenched in futuristic neon rain.", artist: "Kai Cyber", mood: "futuristic" },
      { title: "Frozen Elegance", imageUrl: "https://source.unsplash.com/600x400/?ice,art", description: "A frozen rose trapped in time.", artist: "Isla Frost", mood: "cold" },
      { title: "Eclipsed", imageUrl: "https://source.unsplash.com/600x400/?eclipse,art", description: "A surreal scene of a solar eclipse.", artist: "Luna Eclipse", mood: "mysterious" },
      { title: "Sunlit Meadows", imageUrl: "https://source.unsplash.com/600x400/?meadow,art", description: "A soft meadow kissed by sunlight.", artist: "Flora Bright", mood: "peaceful" },
      { title: "Galactic Bloom", imageUrl: "https://source.unsplash.com/600x400/?galaxy,art", description: "Flowers made of swirling galaxies.", artist: "Nova Petal", mood: "cosmic" },
      { title: "Rustic Charm", imageUrl: "https://source.unsplash.com/600x400/?vintage,art", description: "A cozy old house with charm.", artist: "Ethan Rustic", mood: "nostalgic" },
      { title: "Into the Abyss", imageUrl: "https://source.unsplash.com/600x400/?dark,art", description: "A staircase descending into shadows.", artist: "Damien Noir", mood: "dark" },
      { title: "Autumn Whispers", imageUrl: "https://source.unsplash.com/600x400/?autumn,art", description: "Golden leaves dancing in the wind.", artist: "Amber Fall", mood: "warm" }
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
