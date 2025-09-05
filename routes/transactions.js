const express = require("express");
const router = express.Router();
const {
  getTransactions,
  createTransaction,
} = require("../controllers/transactionController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/transactions", isAuthenticated, getTransactions);

router.post("/transactions", isAuthenticated, createTransaction);

module.exports = router;
