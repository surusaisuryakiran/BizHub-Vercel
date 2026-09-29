const express = require("express");
const {
  addToCart,
  getCartByUser,
  updateCartItem,
  removeCartItem,
  deleteCart
} = require("../controllers/cartController");
const router = express.Router();
router.post("/", addToCart);
router.get("/user/:userId", getCartByUser);
router.put("/:id", updateCartItem);
router.delete("/:cartId/item/:productId", removeCartItem);
router.delete("/:id", deleteCart);
module.exports = router;