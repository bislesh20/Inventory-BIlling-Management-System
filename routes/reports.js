const express = require("express");
const router = express.Router();
const {
  getInventoryReport,
  getTransactionsReport,
} = require("../controllers/reportController");

router.get("/inventory", getInventoryReport);
router.get("/transactions", getTransactionsReport);
module.exports = router;
