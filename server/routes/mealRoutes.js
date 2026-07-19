import express from "express";

import {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} from "../controllers/mealController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").post(createMeal).get(getMeals);

router
  .route("/:id")
  .get(getMealById)
  .put(updateMeal)
  .delete(deleteMeal);

export default router;