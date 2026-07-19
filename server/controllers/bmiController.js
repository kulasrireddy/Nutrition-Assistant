import mongoose from "mongoose";
import Bmi from "../models/Bmi.js";
import User from "../models/User.js";

const getBmiCategory = (bmi) => {
  if (bmi < 18.5) {
    return "Underweight";
  }

  if (bmi < 25) {
    return "Normal Weight";
  }

  if (bmi < 30) {
    return "Overweight";
  }

  return "Obese";
};

// Calculate and save BMI
export const calculateBmi = async (req, res) => {
  try {
    const { height, weight } = req.body;

    if (height === undefined || weight === undefined) {
      return res.status(400).json({
        success: false,
        message: "Height and weight are required",
      });
    }

    const numericHeight = Number(height);
    const numericWeight = Number(weight);

    if (
      Number.isNaN(numericHeight) ||
      Number.isNaN(numericWeight)
    ) {
      return res.status(400).json({
        success: false,
        message: "Height and weight must be valid numbers",
      });
    }

    if (numericHeight < 50 || numericHeight > 250) {
      return res.status(400).json({
        success: false,
        message: "Height must be between 50 and 250 cm",
      });
    }

    if (numericWeight < 20 || numericWeight > 400) {
      return res.status(400).json({
        success: false,
        message: "Weight must be between 20 and 400 kg",
      });
    }

    const heightInMeters = numericHeight / 100;

    const bmiValue = Number(
      (
        numericWeight /
        (heightInMeters * heightInMeters)
      ).toFixed(1)
    );

    const category = getBmiCategory(bmiValue);

    const bmiRecord = await Bmi.create({
      user: req.user._id,
      height: numericHeight,
      weight: numericWeight,
      bmi: bmiValue,
      category,
    });

    await User.findByIdAndUpdate(req.user._id, {
      height: numericHeight,
      weight: numericWeight,
    });

    return res.status(201).json({
      success: true,
      message: "BMI calculated successfully",
      bmi: bmiRecord,
    });
  } catch (error) {
    console.error("Calculate BMI error:", error);

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
      message: "Unable to calculate BMI",
    });
  }
};

// Get BMI history
export const getBmiHistory = async (req, res) => {
  try {
    const records = await Bmi.find({
      user: req.user._id,
    }).sort({
      calculatedAt: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: records.length,
      latestBmi: records.length > 0 ? records[0] : null,
      records,
    });
  } catch (error) {
    console.error("Get BMI history error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve BMI history",
    });
  }
};

// Get latest BMI
export const getLatestBmi = async (req, res) => {
  try {
    const latestBmi = await Bmi.findOne({
      user: req.user._id,
    }).sort({
      calculatedAt: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      bmi: latestBmi,
    });
  } catch (error) {
    console.error("Get latest BMI error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve latest BMI",
    });
  }
};

// Delete BMI record
export const deleteBmi = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid BMI record ID",
      });
    }

    const record = await Bmi.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "BMI record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "BMI record deleted successfully",
    });
  } catch (error) {
    console.error("Delete BMI error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete BMI record",
    });
  }
};