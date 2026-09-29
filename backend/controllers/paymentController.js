const Payment = require("../models/Payment");
const Order = require("../models/Order");
const createPayment = async (req, res) => {
  try {
    const {
      order,
      user,
      amount,
      paymentMethod,
      transactionId,
      paymentStatus
    } = req.body;
    const existingPayment = await Payment.findOne({ order });
    if (existingPayment) {
      return res.status(400).json({
        message: "Payment record already exists for this order"
      });
    }
    const orderDetails = await Order.findById(order);
    if (!orderDetails) {
      return res.status(404).json({
        message: "Order not found"
      });
    }
    const payment = await Payment.create({
      order,
      user,
      amount,
      paymentMethod,
      transactionId,
      paymentStatus
    });
    if (paymentStatus === "paid") {
      await Order.findByIdAndUpdate(order, {
        paymentStatus: "paid"
      });
    }
    const populatedPayment = await Payment.findById(payment._id)
      .populate("order", "totalAmount orderStatus")
      .populate("user", "name email");
    res.status(201).json({
      message: "Payment record created successfully",
      payment: populatedPayment
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating payment",
      error: error.message
    });
  }
};
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("order", "totalAmount orderStatus")
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching payments",
      error: error.message
    });
  }
};
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("order", "totalAmount orderStatus")
      .populate("user", "name email");
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching payment",
      error: error.message
    });
  }
};
const getPaymentByOrder = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      order: req.params.orderId
    })
      .populate("order", "totalAmount orderStatus")
      .populate("user", "name email");
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found for this order"
      });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching payment by order",
      error: error.message
    });
  }
};
const updatePayment = async (req, res) => {
  try {
    const { paymentStatus, transactionId } = req.body;
    const updateData = {};
    if (paymentStatus !== undefined) {
      updateData.paymentStatus = paymentStatus;
    }
    if (transactionId !== undefined) {
      updateData.transactionId = transactionId;
    }
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("order", "totalAmount orderStatus")
      .populate("user", "name email");
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }
    if (paymentStatus === "paid") {
      await Order.findByIdAndUpdate(payment.order._id, {
        paymentStatus: "paid"
      });
    }
    if (paymentStatus === "failed") {
      await Order.findByIdAndUpdate(payment.order._id, {
        paymentStatus: "failed"
      });
    }
    res.status(200).json({
      message: "Payment updated successfully",
      payment
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating payment",
      error: error.message
    });
  }
};
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }
    res.status(200).json({
      message: "Payment deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting payment",
      error: error.message
    });
  }
};
module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  getPaymentByOrder,
  updatePayment,
  deletePayment
};