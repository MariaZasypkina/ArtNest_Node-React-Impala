

// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error("Error occurred:", err);
  
    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
  
    // Handle duplicate key errors (e.g., unique email)
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
  
    // Handle unauthorized access
    if (err.name === "UnauthorizedError") {
      return res.status(401).json({ message: "Unauthorized access" });
    }
  
    // Default error response
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  };
  
  module.exports = errorHandler;
  