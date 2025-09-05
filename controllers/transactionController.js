const Transaction = require("../models/Transaction");
const Product = require("../models/Product");
const { checkStockAvailability } = require("../utils/stockManagement");

const getTransactions = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    const query = { businessId: req.businessId };

    if (type && ["sale", "purchase"].includes(type)) {
      query.type = type;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });

    res.json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({
      error: true,
      message: "Could not fetch transactions. Please try again",
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { type, customerId, vendorId, products, date } = req.body;

    // Basic validation
    if (
      !type ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({
        error: true,
        message: "Transaction type and products are required",
      });
    }

    if (!["sale", "purchase"].includes(type)) {
      return res.status(400).json({
        error: true,
        message: "Transaction type must be either sale or purchase",
      });
    }

    if (type === "sale" && !customerId) {
      return res.status(400).json({
        error: true,
        message: "Customer is required for sales transactions",
      });
    }

    if (type === "purchase" && !vendorId) {
      return res.status(400).json({
        error: true,
        message: "Vendor is required for purchase transactions",
      });
    }

    // For sales, check stock availability using utility
    if (type === "sale") {
      const stockCheck = await checkStockAvailability(products, req.businessId);
      if (!stockCheck.available) {
        return res.status(400).json({
          error: true,
          message: "Stock not available",
          details: stockCheck.unavailable,
        });
      }
    }

    let totalAmount = 0;
    const processedProducts = [];

    // Process each product
    for (const item of products) {
      const product = await Product.findOne({
        _id: item.productId,
        businessId: req.businessId,
      });

      if (!product) {
        return res.status(404).json({
          error: true,
          message: `Product not found: ${item.productId}`,
        });
      }

      // Update stock (inline - simpler than utility)
      if (type === "sale") {
        product.stock -= item.quantity;
      } else {
        product.stock += item.quantity;
      }
      await product.save();

      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;

      processedProducts.push({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    const newTransaction = new Transaction({
      type,
      customerId: type === "sale" ? customerId : undefined,
      vendorId: type === "purchase" ? vendorId : undefined,
      products: processedProducts,
      totalAmount,
      date: date || new Date(),
      businessId: req.businessId,
    });

    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Create transaction error:", error);
    res.status(500).json({
      error: true,
      message: "Could not create transaction. Please try again",
    });
  }
};

module.exports = { getTransactions, createTransaction };
