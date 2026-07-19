import mongoose from "mongoose";

const bmiSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    height: {
      type: Number,
      required: [true, "Height is required"],
      min: [50, "Height must be at least 50 cm"],
      max: [250, "Height cannot exceed 250 cm"],
    },

    weight: {
      type: Number,
      required: [true, "Weight is required"],
      min: [20, "Weight must be at least 20 kg"],
      max: [400, "Weight cannot exceed 400 kg"],
    },

    bmi: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Underweight",
        "Normal Weight",
        "Overweight",
        "Obese",
      ],
    },

    calculatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

bmiSchema.index({ user: 1, calculatedAt: -1 });

const Bmi = mongoose.model("Bmi", bmiSchema);

export default Bmi;