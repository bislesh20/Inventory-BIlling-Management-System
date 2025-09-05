const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  updateStock,
  deleteProduct,
} = require("../controllers/productController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", isAuthenticated, getProducts);
router.post("/", isAuthenticated, createProduct);
router.put("/:id/stock", isAuthenticated, updateStock);
router.put("/:id", isAuthenticated, updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);

module.exports = router;
