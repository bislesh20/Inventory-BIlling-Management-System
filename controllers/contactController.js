const Contact = require("../models/Contact");
const { validateEmail, validatePhone } = require("../utils/validation");

// Get all contacts with optional filtering
const getContacts = async (req, res) => {
  try {
    const { type, search } = req.query;
    const query = { businessId: req.businessId };

    // Filter by contact type if provided
    if (type && ["customer", "vendor"].includes(type)) {
      query.type = type;
    }

    // Search by name if provided
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({
      error: true,
      message: "Could not fetch contacts. Please try again",
    });
  }
};

// Create new contact
const createContact = async (req, res) => {
  try {
    const { name, phone, email, address, type } = req.body;

    // Check required fields
    if (!name || !type) {
      return res.status(400).json({
        error: true,
        message: "Name and type are required",
      });
    }

    // Validate contact type
    if (!["customer", "vendor"].includes(type)) {
      return res.status(400).json({
        error: true,
        message: "Type must be either customer or vendor",
      });
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
      return res.status(400).json({
        error: true,
        message: "Please enter a valid email address",
      });
    }

    // Validate phone if provided
    if (phone && !validatePhone(phone)) {
      return res.status(400).json({
        error: true,
        message: "Please enter a valid phone number",
      });
    }

    // Check for duplicates - simplified approach
    const existingContact = await Contact.findOne({
      businessId: req.businessId,
      type: type,
      $or: [
        { name: { $regex: new RegExp(`^${name}$`, "i") } },
        ...(email
          ? [{ email: { $regex: new RegExp(`^${email}$`, "i") } }]
          : []),
        ...(phone ? [{ phone: phone }] : []),
      ],
    });

    if (existingContact) {
      return res.status(409).json({
        error: true,
        message: `A ${type} with similar details already exists`,
        existingContact: {
          id: existingContact._id,
          name: existingContact.name,
          email: existingContact.email,
          phone: existingContact.phone,
          type: existingContact.type,
        },
      });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      phone,
      email,
      address,
      type,
      businessId: req.businessId,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Create contact error:", error);
    res.status(500).json({
      error: true,
      message: "Could not create contact. Please try again",
    });
  }
};

// Update existing contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate contact type if being updated
    if (updates.type && !["customer", "vendor"].includes(updates.type)) {
      return res.status(400).json({
        error: true,
        message: "Type must be either customer or vendor",
      });
    }

    // Validate email if being updated
    if (updates.email && !validateEmail(updates.email)) {
      return res.status(400).json({
        error: true,
        message: "Please enter a valid email address",
      });
    }

    // Validate phone if being updated
    if (updates.phone && !validatePhone(updates.phone)) {
      return res.status(400).json({
        error: true,
        message: "Please enter a valid phone number",
      });
    }

    // Find and update contact
    const contact = await Contact.findOneAndUpdate(
      { _id: id, businessId: req.businessId },
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        error: true,
        message: "Contact not found",
      });
    }

    res.json({
      success: true,
      message: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({
      error: true,
      message: "Could not update contact. Please try again",
    });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findOneAndDelete({
      _id: id,
      businessId: req.businessId,
    });

    if (!contact) {
      return res.status(404).json({
        error: true,
        message: "Contact not found",
      });
    }

    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({
      error: true,
      message: "Could not delete contact. Please try again",
    });
  }
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
