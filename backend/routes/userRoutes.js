const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const {
  protect,
  authorizeRoles
} = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", protect, authorizeRoles("admin"), createUser);
router.get("/", protect, authorizeRoles("admin"), getUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);
module.exports = router;