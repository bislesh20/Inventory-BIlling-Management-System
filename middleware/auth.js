const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    // Verify JWT token (no session check)
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Token required",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Set businessId (or userId) for multi-tenancy
      req.businessId = decoded.userId;
      next();
    } catch (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      error: true,
      message: "Authentication error",
    });
  }
};

module.exports = { isAuthenticated };
