const Category = require("../models/Category");
const createCategory = async (req, res) => {
  try {
    const { categoryName, description, status } = req.body;
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists"
      });
    }
    const category = await Category.create({
      categoryName,
      description,
      status
    });
    res.status(201).json({
      message: "Category created successfully",
      category
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating category",
      error: error.message
    });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message
    });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching category",
      error: error.message
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }
    res.status(200).json({
      message: "Category updated successfully",
      category
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating category",
      error: error.message
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }
    res.status(200).json({
      message: "Category deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting category",
      error: error.message
    });
  }
};
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};