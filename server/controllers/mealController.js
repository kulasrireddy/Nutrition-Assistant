import mongoose from "mongoose";
import Meal from "../models/Meal.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create meal
export const createMeal = async (req, res) => {
  try {
    const {
      mealType,
      foodName,
      quantity,
      unit,
      calories,
      protein,
      carbohydrates,
      fats,
      notes,
      mealDate,
    } = req.body;

    if (
      !mealType ||
      !foodName ||
      quantity === undefined ||
      calories === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Meal type, food name, quantity and calories are required",
      });
    }

    const meal = await Meal.create({
      user: req.user._id,
      mealType,
      foodName,
      quantity: Number(quantity),
      unit,
      calories: Number(calories),
      protein: protein === undefined ? 0 : Number(protein),
      carbohydrates:
        carbohydrates === undefined ? 0 : Number(carbohydrates),
      fats: fats === undefined ? 0 : Number(fats),
      notes,
      mealDate: mealDate || Date.now(),
    });

    return res.status(201).json({
      success: true,
      message: "Meal added successfully",
      meal,
    });
  } catch (error) {
    console.error("Create meal error:", error);

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((item) => item.message)
        .join(", ");

      return res.status(400).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to add meal",
    });
  }
};

// Get all meals of logged-in user
export const getMeals = async (req, res) => {
  try {
    const filter = {
      user: req.user._id,
    };

    if (req.query.mealType) {
      filter.mealType = req.query.mealType;
    }

    if (req.query.date) {
      const selectedDate = new Date(req.query.date);

      if (Number.isNaN(selectedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format",
        });
      }

      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      filter.mealDate = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    const meals = await Meal.find(filter).sort({
      mealDate: -1,
      createdAt: -1,
    });

    const totals = meals.reduce(
      (result, meal) => {
        result.calories += meal.calories;
        result.protein += meal.protein;
        result.carbohydrates += meal.carbohydrates;
        result.fats += meal.fats;

        return result;
      },
      {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fats: 0,
      }
    );

    return res.status(200).json({
      success: true,
      count: meals.length,
      totals,
      meals,
    });
  } catch (error) {
    console.error("Get meals error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve meals",
    });
  }
};

// Get one meal
export const getMealById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal ID",
      });
    }

    const meal = await Meal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }

    return res.status(200).json({
      success: true,
      meal,
    });
  } catch (error) {
    console.error("Get meal error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve meal",
    });
  }
};

// Update meal
export const updateMeal = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal ID",
      });
    }

    const meal = await Meal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }

    const allowedFields = [
      "mealType",
      "foodName",
      "quantity",
      "unit",
      "calories",
      "protein",
      "carbohydrates",
      "fats",
      "notes",
      "mealDate",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        meal[field] = req.body[field];
      }
    });

    const updatedMeal = await meal.save();

    return res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      meal: updatedMeal,
    });
  } catch (error) {
    console.error("Update meal error:", error);

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((item) => item.message)
        .join(", ");

      return res.status(400).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update meal",
    });
  }
};

// Delete meal
export const deleteMeal = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal ID",
      });
    }

    const meal = await Meal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
    });
  } catch (error) {
    console.error("Delete meal error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete meal",
    });
  }
};