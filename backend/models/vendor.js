const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true
    },
    businessAddress: {
      type: String,
      required: true
    },
    gstNumber: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["pending", "approved", "suspended"],
      default: "pending"
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Vendor", vendorSchema);