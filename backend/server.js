const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const cors = require('cors'); 
const User = require('./models/user'); // Import User model
const galleryRoutes = require('./routes/galleryRoutes'); // Import Gallery routes
const tipRoutes = require("./routes/tipRoutes"); // Import tip routes
const commentRoutes = require("./routes/commentRoutes");


dotenv.config(); // Load environment variables
const app = express();
connectDB(); // Connect to MongoDB

app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Middleware to parse JSON requests


const Gallery = require('./models/gallery');  // Connect model

app.post('/api/upload-form', async (req, res) => {
    const { title, artist, description, mood, media, imageUrl } = req.body;

    console.log("🎨 New artwork submission:", req.body);

    if (!title || !artist || !imageUrl) {
        return res.status(400).json({ message: 'Title, artist, and image URL are required.' });
    }

    try {
        // creating new doc in artnest.galleries
        const newArtwork = new Gallery({
            title,
            artist,
            description,
            mood,
            media,
            imageUrl
        });

        await newArtwork.save();  // save in  MongoDB

        console.log("✅ Artwork saved to database:", newArtwork);

        res.status(201).json({ message: 'Artwork submitted and saved successfully!', artwork: newArtwork });
    } catch (error) {
        console.error("❌ Submission failed:", error);
        res.status(500).json({ message: 'Failed to submit artwork.' });
    }
});

// Use auth routes
app.use('/api/users', require('./routes/authRoutes'));

// Use tip routes
app.use('/api/tips', tipRoutes);

// Use Gallery routes
app.use('/api/gallery', galleryRoutes);

//Route for comments
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5010;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
