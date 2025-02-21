import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { allSettings, updateTheme } from "../controllers/setting.controller.js";
import { all } from "axios";

const router = express.Router();

router.get("/", protect, allSettings);
router.post("/theme", protect, updateTheme);

export default router;
