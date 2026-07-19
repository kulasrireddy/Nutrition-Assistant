import express from "express";

import {
  addWater,
  getTodayWater,
  deleteWater,
} from "../controllers/waterController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", addWater);

router.get("/", getTodayWater);

router.delete("/:id", deleteWater);

export default router;