const express = require("express");
const Tip = require("../models/tip"); 

const router = express.Router();

// Get a random tip
router.get("/random", async (req, res) => {
  try {
    const count = await Tip.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: "No tips found" });
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomTip = await Tip.findOne().skip(randomIndex);
    
    res.json(randomTip);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
