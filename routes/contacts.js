const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", isAuthenticated, getContacts);
router.post("/", isAuthenticated, createContact);
router.put("/:id", isAuthenticated, updateContact);
router.delete("/:id", isAuthenticated, deleteContact);

module.exports = router;
