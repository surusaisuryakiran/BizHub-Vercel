const Cart = require("../models/Cart");
const Product = require("../models/Product");
const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};
const addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;
    const productDetails = await Product.findById(product);
    if (!productDetails) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    if (productDetails.stockQuantity < quantity) {
      return res.status(400).json({
        message: "Insufficient stock"
      });
    }
    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = new Cart({
        user,
        items: [
          {
            product,
            quantity,
            price: productDetails.price
          }
        ]
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === product
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (productDetails.stockQuantity < newQuantity) {
          return res.status(400).json({
            message: "Requested quantity exceeds available stock"
          });
        }
        existingItem.quantity = newQuantity;
        existingItem.price = productDetails.price;
      } else {
        cart.items.push({
          product,
          quantity,
          price: productDetails.price
        });
      }
    }
    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();
    const populatedCart = await Cart.findById(cart._id)
      .populate("user", "name email")
      .populate("items.product", "productName price stockQuantity");
    res.status(201).json({
      message: "Product added to cart successfully",
      cart: populatedCart
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding product to cart",
      error: error.message
    });
  }
};
const getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId })
      .populate("user", "name email")
      .populate("items.product", "productName price stockQuantity");
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart",
      error: error.message
    });
  }
};
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }
    if (cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }
    cart.items[0].quantity = quantity;
    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();
    const updatedCart = await Cart.findById(cart._id)
      .populate("user", "name email")
      .populate("items.product", "productName price stockQuantity");
    res.status(200).json({
      message: "Cart updated successfully",
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating cart",
      error: error.message
    });
  }
};
const removeCartItem = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();
    res.status(200).json({
      message: "Product removed from cart successfully",
      cart
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing product from cart",
      error: error.message
    });
  }
};
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }
    res.status(200).json({
      message: "Cart deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting cart",
      error: error.message
    });
  }
};
module.exports = {
  addToCart,
  getCartByUser,
  updateCartItem,
  removeCartItem,
  deleteCart
};