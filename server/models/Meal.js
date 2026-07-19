import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mealType: {
      type: String,
      required: [true, "Meal type is required"],
      enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
    },

    foodName: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
      maxlength: [100, "Food name cannot exceed 100 characters"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0.1, "Quantity must be greater than 0"],
    },

    unit: {
      type: String,
      required: [true, "Unit is required"],
      enum: ["grams", "ml", "pieces", "cups", "servings"],
      default: "grams",
    },

    calories: {
      type: Number,
      required: [true, "Calories are required"],
      min: [0, "Calories cannot be negative"],
    },

    protein: {
      type: Number,
      default: 0,
      min: [0, "Protein cannot be negative"],
    },

    carbohydrates: {
      type: Number,
      default: 0,
      min: [0, "Carbohydrates cannot be negative"],
    },

    fats: {
      type: Number,
      default: 0,
      min: [0, "Fats cannot be negative"],
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [300, "Notes cannot exceed 300 characters"],
      default: "",
    },

    mealDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

mealSchema.index({ user: 1, mealDate: -1 });

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;