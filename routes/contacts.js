const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/contacts", isAuthenticated, getContacts);
router.post("/contacts", isAuthenticated, createContact);
router.put("/contacts/:id", isAuthenticated, updateContact);
router.delete("/contacts/:id", isAuthenticated, deleteContact);

module.exports = router;
