const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      shippingAddress,
      paymentMethod
    } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item"
      });
    }
    const orderItems = [];
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.product}`
        });
      }
      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.productName}`
        });
      }
      orderItems.push({
        product: product._id,
        productName: product.productName,
        quantity: item.quantity,
        price: product.price
      });
      totalAmount += product.price * item.quantity;
    }
    const order = await Order.create({
      user,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod
    });
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: {
          stockQuantity: -item.quantity
        }
      });
    }
    await Cart.findOneAndUpdate(
      { user },
      {
        $set: {
          items: [],
          totalAmount: 0
        }
      }
    );
    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("items.product", "productName price");
    res.status(201).json({
      message: "Order created successfully",
      order: populatedOrder
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message
    });
  }
};
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "productName price")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "productName price");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order",
      error: error.message
    });
  }
};
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId
    })
      .populate("items.product", "productName price")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user orders",
      error: error.message
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const updateData = {};
    if (orderStatus !== undefined) {
      updateData.orderStatus = orderStatus;
    }
    if (paymentStatus !== undefined) {
      updateData.paymentStatus = paymentStatus;
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("user", "name email")
      .populate("items.product", "productName price");
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }
    res.status(200).json({
      message: "Order updated successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating order",
      error: error.message
    });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }
    res.status(200).json({
      message: "Order deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting order",
      error: error.message
    });
  }
};
module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUser,
  updateOrder,
  deleteOrder
};