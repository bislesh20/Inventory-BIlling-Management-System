const Product = require("../models/Product");
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = { businessId: req.businessId };

    // Search by name or category
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    } else if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to fetch products",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Validation
    if (!name || price === undefined) {
      return res.status(400).json({
        error: true,
        message: "Name and price are required",
      });
    }

    const product = new Product({
      name,
      description,
      price,
      stock: stock || 0,
      category,
      businessId: req.businessId,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to create product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, businessId: req.businessId },
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to update product",
    });
  }
};

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, quantity } = req.body;

    // Validation
    if (!["increase", "decrease"].includes(action)) {
      return res.status(400).json({
        error: true,
        message: "Action must be 'increase' or 'decrease'",
      });
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        error: true,
        message: "Quantity must be a positive number",
      });
    }

    const product = await Product.findOne({
      _id: id,
      businessId: req.businessId,
    });

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Product not found",
      });
    }

    // Update stock based on action
    if (action === "increase") {
      product.stock += parseInt(quantity);
    } else if (action === "decrease") {
      if (product.stock < quantity) {
        return res.status(400).json({
          error: true,
          message: "Insufficient stock available",
        });
      }
      product.stock -= parseInt(quantity);
    }

    await product.save();

    res.json({
      success: true,
      message: `Stock ${action}d successfully`,
      product: {
        id: product._id,
        name: product.name,
        previousStock:
          product.stock + (action === "increase" ? -quantity : quantity),
        currentStock: product.stock,
        change: action === "increase" ? `+${quantity}` : `-${quantity}`,
      },
    });
  } catch (error) {
    console.error("Update stock error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to update stock",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({
      _id: id,
      businessId: req.businessId,
    });

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to delete product",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateStock,
  updateProduct,
  deleteProduct,
};
