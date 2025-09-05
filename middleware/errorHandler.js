const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal server error",
  });
};

// 404 handler middleware
const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: true,
    message: "Route not found",
  });
};

module.exports = { errorHandler, notFoundHandler };
