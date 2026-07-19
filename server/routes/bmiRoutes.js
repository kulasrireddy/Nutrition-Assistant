import express from "express";

import {
  calculateBmi,
  getBmiHistory,
  getLatestBmi,
  deleteBmi,
} from "../controllers/bmiController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", calculateBmi);
router.get("/", getBmiHistory);
router.get("/latest", getLatestBmi);
router.delete("/:id", deleteBmi);

export default router;