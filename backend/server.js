const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const cors = require('cors'); 
const User = require('./models/user'); // Import User model
const galleryRoutes = require('./routes/galleryRoutes'); // Import Gallery routes
const tipRoutes = require("./routes/tipRoutes"); // Import tip routes
const commentRoutes = require("./routes/commentRoutes");
const securityMiddleware = require('./middleware/security') //Import security middleware
const errorHandler = require("./middleware/errorHandler");

dotenv.config(); // Load environment variables
const app = express();
connectDB(); // Connect to MongoDB

app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Middleware to parse JSON requests

// Apply security middleware
securityMiddleware(app);

const Gallery = require('./models/gallery');  // Connect model

// Upload artwork endpoint
app.post('/api/upload-form', async (req, res, next) => {
    const { title, artist, description, mood, media, imageUrl } = req.body;

    console.log("🎨 New artwork submission:", req.body);

    if (!title || !artist || !imageUrl) {
        return res.status(400).json({ message: 'Title, artist, and image URL are required.' });
    }

    try {
        const newArtwork = new Gallery({ title, artist, description, mood, media, imageUrl });
        await newArtwork.save();

        console.log("✅ Artwork saved to database:", newArtwork);
        res.status(201).json({ message: 'Artwork submitted and saved successfully!', artwork: newArtwork });
    } catch (error) {
        next(error);  // Pass error to the errorHandler
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

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

