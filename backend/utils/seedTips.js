const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config");
const Tip = require("../models/tip");

dotenv.config();
connectDB();

const seedTips = async () => {
  try {
    await Tip.deleteMany(); // Очистим коллекцию перед добавлением
    console.log("Old tips removed.");

    const tips = [
        { text: "Creativity flourishes when you embrace imperfection." },
        { text: "Doodle your thoughts – even scribbles spark ideas." },
        { text: "Step away from your work; fresh eyes bring new perspectives." },
        { text: "Combine two unrelated ideas and see what emerges." },
        { text: "Keep a small notebook – inspiration strikes anywhere." },
        { text: "Revisit your old work; past ideas might spark something new." },
        { text: "Constraints fuel creativity – try limiting your tools." },
        { text: "Silence can be powerful – let your mind wander." },
        { text: "Create something just for yourself, not for an audience." },
        { text: "Break your routine – new environments inspire new ideas." },
        { text: "Let go of perfectionism; done is better than perfect." },
        { text: "Observe the world like a curious child – ask 'why' often." },
        { text: "Collaboration amplifies creativity – brainstorm with others." },
        { text: "Turn a mistake into a creative opportunity." },
        { text: "Change your medium – switch from digital to paper or vice versa." },
        { text: "Set a timer and create something in 10 minutes." },
        { text: "Repurpose old work into something new and unexpected." },
        { text: "Challenge yourself to create daily, even if it’s small." },
        { text: "Use randomness – let chance guide your creativity." },
        { text: "Listen to different genres of music while working." },
        { text: "Try working with your non-dominant hand." },
        { text: "Blend inspiration from different cultures and art styles." },
        { text: "Tell a story with your work – even abstract art has a narrative." },
        { text: "Take deep breaths – relaxation fuels creativity." },
        { text: "Find inspiration in nature – observe patterns and textures." },
        { text: "Work with a limited color palette to spark new ideas." },
        { text: "Make a mind map to visualize connections between ideas." },
        { text: "Start with a random word and create something based on it." },
        { text: "Ask 'what if' – twist reality to generate fresh concepts." },
        { text: "Sketch before you start – rough ideas lead to breakthroughs." },
        { text: "Try working at different times of the day to see when you're most creative." },
        { text: "Experiment with a completely new technique or style." },
        { text: "Limit yourself to five words and build a concept from them." },
        { text: "Rearrange elements in your work – unexpected changes create new meaning." },
        { text: "Give yourself creative 'rules' and then break them." },
        { text: "Write or draw your dreams – subconscious ideas are powerful." },
        { text: "Disconnect from screens for an hour and create analog-style." },
        { text: "Play with scale – make something tiny or gigantic." },
        { text: "Try creating in complete silence, then with loud music – compare the results." }
      ];      

    await Tip.insertMany(tips);
    console.log("Tips added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding tips:", error);
    mongoose.connection.close();
  }
};

seedTips();
