import express from "express";

import { getWeeklyAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/weekly", protect, getWeeklyAnalytics);

export default router;