const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "online"],
      required: true
    },
    transactionId: {
      type: String,
      default: ""
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending"
    },
    paymentDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Payment", paymentSchema);