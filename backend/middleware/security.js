// middleware/security.js

const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again later.",
});

// Apply security middlewares
module.exports = (app) => {
    console.log("🛡️  Security middleware applied!");  // Log for checking
    app.use(helmet());    // Secure HTTP headers
    app.use(xss());       // Prevent XSS attacks
    app.use(limiter);     // Limit requests
};
