require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Vendor = require("./models/vendor");
const Category = require("./models/Category");
const Product = require("./models/Product");

async function seed() {
  await connectDB();

  const password = await bcrypt.hash("password123", 10);
  const users = [
    { name: "Demo Buyer", email: "buyer@acme.com", phone: "+91 9876511223", password, role: "buyer", address: "Visakhapatnam, AP" },
    { name: "Demo Vendor", email: "vendor@apex.com", phone: "+91 9876511224", password, role: "vendor", address: "Visakhapatnam, AP" },
    { name: "Demo Admin", email: "admin@bizhub.com", phone: "+91 9876511225", password, role: "admin", address: "Visakhapatnam, AP" }
  ];
  for (const user of users) await User.findOneAndUpdate({ email: user.email }, user, { upsert: true, new: true, setDefaultsOnInsert: true });

  const vendor = await Vendor.findOneAndUpdate(
    { email: "vendor@apex.com" },
    { vendorName: "Apex Industrial Supplies", companyName: "Apex Industrial Supplies Pvt Ltd", email: "vendor@apex.com", phone: "+91 9876511224", businessAddress: "Visakhapatnam, AP", gstNumber: "37AAAAA1234A1Z5", status: "approved" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const category = await Category.findOneAndUpdate(
    { categoryName: "Industrial Supplies" },
    { categoryName: "Industrial Supplies", description: "Industrial and B2B wholesale products", status: "active" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const products = [
    { productName: "Industrial Safety Gloves", description: "Heavy-duty safety gloves for industrial use.", price: 250, stockQuantity: 100, imageUrl: "", vendor: vendor._id, category: category._id, status: "available" },
    { productName: "Industrial Stretch Wrap", description: "High-strength stretch film for packaging and pallets.", price: 3100, stockQuantity: 85, imageUrl: "", vendor: vendor._id, category: category._id, status: "available" },
    { productName: "CAT6 Ethernet Cable Drum", description: "305 meter solid copper CAT6 networking cable.", price: 6200, stockQuantity: 35, imageUrl: "", vendor: vendor._id, category: category._id, status: "available" }
  ];
  for (const product of products) {
    await Product.findOneAndUpdate({ productName: product.productName, vendor: vendor._id }, product, { upsert: true, new: true, setDefaultsOnInsert: true });
  }

  console.log("Seed complete.");
  console.log("Demo login: buyer@acme.com / password123");
  console.log("Demo login: vendor@apex.com / password123");
  console.log("Demo login: admin@bizhub.com / password123");
  await mongoose.connection.close();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
