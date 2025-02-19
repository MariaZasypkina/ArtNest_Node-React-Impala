const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const cors = require('cors'); 
const User = require('./models/user'); // Import User model
const galleryRoutes = require('./routes/galleryRoutes'); // Import Gallery routes
const tipRoutes = require("./routes/tipRoutes"); // Import tip routes

dotenv.config(); // Load environment variables

const app = express();

connectDB(); // Connect to MongoDB

app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Middleware to parse JSON requests

// Use auth routes
app.use('/api/users', require('./routes/authRoutes'));

//Use tip routes

app.use('/api/tips', tipRoutes); // Use tip routes

//Use Gallery routes

app.use('/api/gallery', galleryRoutes);



const PORT = process.env.PORT || 5010;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
