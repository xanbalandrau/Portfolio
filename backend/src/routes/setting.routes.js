import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  allSettings,
  updateSkill,
  updateTheme,
} from "../controllers/setting.controller.js";

const router = express.Router();

router.get("/", protect, allSettings);
router.put("/theme", protect, updateTheme);
router.put("/skill", protect, updateSkill);

export default router;
