const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const registerUser = async (req, res) => {
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
    const token = generateToken(user._id, user.role);
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    const token = generateToken(user._id, user.role);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message
    });
  }
};
module.exports = {
  registerUser,
  loginUser
};