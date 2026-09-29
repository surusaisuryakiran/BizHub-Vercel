const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0
    },
    imageUrl: {
      type: String,
      default: ""
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    status: {
      type: String,
      enum: ["available", "out_of_stock", "inactive"],
      default: "available"
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);