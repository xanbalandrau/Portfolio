import express from "express";
import multer from "multer";

import {
  createSkill,
  deleteSkill,
  updateSkill,
} from "../controllers/skill.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/addSkill", upload.single("imageFile"), protect, createSkill);
router.delete("/:id", protect, deleteSkill);
router.put("/:id", upload.single("imageFile"), protect, updateSkill);
export default router;
