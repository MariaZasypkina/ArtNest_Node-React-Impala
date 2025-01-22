const express = require('express');
const dotenv = require('dotenv');


const app = express();


dotenv.config();


const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Server is running on port 5000!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
