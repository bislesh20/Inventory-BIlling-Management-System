// utils/stockManager.js
const Product = require("../models/Product");

// Check stock availability
const checkStockAvailability = async (products) => {
  const unavailable = [];

  for (const item of products) {
    const product = await Product.findById(item.productId);

    if (!product) {
      unavailable.push({
        productId: item.productId,
        reason: "Product not found",
      });
    } else if (product.stock < item.quantity) {
      unavailable.push({
        productId: item.productId,
        name: product.name,
        requested: item.quantity,
        available: product.stock,
        reason: "Insufficient stock",
      });
    }
  }

  return {
    available: unavailable.length === 0,
    unavailable,
  };
};

// Calculate low stock items
const getLowStockItems = async (businessId, threshold = 10) => {
  try {
    const products = await Product.find({
      businessId,
      stock: { $lte: threshold },
    }).select("name stock category");

    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkStockAvailability,
  getLowStockItems,
};
