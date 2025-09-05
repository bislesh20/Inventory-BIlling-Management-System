const express = require("express");
const router = express.Router();
const {
  getInventoryReport,
  getTransactionsReport,
} = require("../controllers/reportController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/inventory", isAuthenticated, getInventoryReport);
router.get("/transactions", isAuthenticated, getTransactionsReport);
module.exports = router;
