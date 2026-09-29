const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, address } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      address
    });
    res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message
    });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message
    });
  }
};
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};