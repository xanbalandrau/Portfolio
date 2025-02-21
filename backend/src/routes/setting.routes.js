import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  allSettings,
  updateSkill,
  updateTheme,
} from "../controllers/setting.controller.js";

const router = express.Router();

router.get("/", protect, allSettings);
router.post("/theme", protect, updateTheme);
router.post("/skill", protect, updateSkill);

export default router;
