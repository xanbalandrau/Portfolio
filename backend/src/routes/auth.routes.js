import express from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserSkill,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { protect, protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, protectAdmin, getAllUsers);
router.get("/:id", protect, getUserSkill);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.delete("/:id", protect, protectAdmin, deleteUser);

export default router;
