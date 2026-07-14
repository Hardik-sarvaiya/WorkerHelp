const jwt = require("jsonwebtoken");
require("dotenv").config();

// --------------------------
// 1. Auth Middleware - Verify JWT
// --------------------------
const auth = (req, res, next) => {
  try {
    // Bypass public routes
    if (
      req.path.startsWith("/auth/sendOTP") ||
      req.path.startsWith("/auth/signUp")
    ) {
      return next();
    }

    // Get token from Authorization header only (recommended)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Token is missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// --------------------------
// 2. Role-based Authorization Middleware
// --------------------------
const authorize = (roles = []) => {
  return (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized access" });
      }

      // Make sure JWT has `role` field or adjust if using `accountType`
      if (roles.length && !roles.includes(user.role || user.accountType)) {
        return res
          .status(403)
          .json({ success: false, message: "Access denied: Insufficient role" });
      }

      next();
      } 
      catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Role verification failed" });
    }
  };
};

module.exports = { auth, authorize };
