import express from "express";

import {
  checkAuth,
  createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserSkill,
  loginUser,
  logoutUser,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { protect, protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, protectAdmin, getAllUsers);
router.get("/:id", protect, getUserSkill);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/check-auth", protect, checkAuth);
router.post("/logout", protect, logoutUser);
router.delete("/:id", protect, protectAdmin, deleteUser);
router.get("/verify/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
