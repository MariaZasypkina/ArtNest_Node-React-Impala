const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Checking token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Add user to the request
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next(); // Continie 
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
