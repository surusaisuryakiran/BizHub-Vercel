const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item"
      }
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    shippingAddress: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "online"],
      default: "cash_on_delivery"
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },
    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
      ],
      default: "placed"
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);