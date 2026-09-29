const Product = require("../models/Product");
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      stockQuantity,
      imageUrl,
      vendor,
      category,
      status
    } = req.body;
    const product = await Product.create({
      productName,
      description,
      price,
      stockQuantity,
      imageUrl,
      vendor,
      category,
      status
    });
    const populatedProduct = await Product.findById(product._id)
      .populate("vendor", "vendorName companyName email")
      .populate("category", "categoryName");
    res.status(201).json({
      message: "Product created successfully",
      product: populatedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendor", "vendorName companyName email")
      .populate("category", "categoryName");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendor", "vendorName companyName email")
      .populate("category", "categoryName");
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("vendor", "vendorName companyName email")
      .populate("category", "categoryName");

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message
    });
  }
};
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};