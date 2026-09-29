const express = require("express");
const {
  createPayment,
  getPayments,
  getPaymentById,
  getPaymentByOrder,
  updatePayment,
  deletePayment
} = require("../controllers/paymentController");
const router = express.Router();
router.post("/", createPayment);
router.get("/", getPayments);
router.get("/order/:orderId", getPaymentByOrder);
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);
module.exports = router;