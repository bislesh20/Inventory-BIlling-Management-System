const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  updateStock,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", createProduct);
router.patch("/:id/stock", updateStock);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
