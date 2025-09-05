const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const { getLowStockItems } = require("../utils/stockManagement");

const getInventoryReport = async (req, res) => {
  try {
    const businessId = req.session.user.businessId;

    const products = await Product.find({ businessId })
      .select("name category stock price")
      .sort({ category: 1, name: 1 });

    // Use utility to get low stock items
    const lowStockItems = await getLowStockItems(businessId, 10);

    res.json({
      success: true,
      data: products,
      totalProducts: products.length,
      lowStockCount: lowStockItems.length,
      lowStockItems: lowStockItems,
    });
  } catch (error) {
    console.error("Error fetching inventory report:", error);
    res.status(500).json({
      error: true,
      message: "Could not generate inventory report. Please try again",
    });
  }
};

const getTransactionsReport = async (req, res) => {
  try {
    const businessId = req.session.user.businessId;
    const { startDate, endDate, type } = req.query;

    let query = { businessId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (type && ["sale", "purchase"].includes(type)) {
      query.type = type;
    }

    const transactions = await Transaction.find(query)
      .populate("customerId", "name")
      .populate("vendorId", "name")
      .populate("products.productId", "name")
      .sort({ date: -1 });

    const summary = {
      totalTransactions: transactions.length,
      totalSales: 0,
      totalPurchases: 0,
      totalAmount: 0,
    };

    transactions.forEach((transaction) => {
      if (transaction.type === "sale") {
        summary.totalSales += transaction.totalAmount;
      } else if (transaction.type === "purchase") {
        summary.totalPurchases += transaction.totalAmount;
      }
      summary.totalAmount += transaction.totalAmount;
    });

    res.json({
      success: true,
      data: transactions,
      summary,
    });
  } catch (error) {
    console.error("Error fetching transactions report:", error);
    res.status(500).json({
      error: true,
      message: "Could not generate transactions report. Please try again",
    });
  }
};

module.exports = {
  getInventoryReport,
  getTransactionsReport,
};
