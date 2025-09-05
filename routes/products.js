const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/products", isAuthenticated, getProducts);
router.post("/products", isAuthenticated, createProduct);
router.put("/products/:id", isAuthenticated, updateProduct);
router.delete("/products/:id", isAuthenticated, deleteProduct);

module.exports = router;
