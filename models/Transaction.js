const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["sale", "purchase"],
    required: true,
  },
  customerId: {
    type: String,
    required: function () {
      return this.type === "sale";
    },
  },
  vendorId: {
    type: String,
    required: function () {
      return this.type === "purchase";
    },
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  businessId: {
    type: String,
    required: true,
    index: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
