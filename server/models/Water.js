import mongoose from "mongoose";

const waterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: [true, "Water amount is required"],
      min: [1, "Amount must be greater than 0"],
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

waterSchema.index({ user: 1, date: -1 });

const Water = mongoose.model("Water", waterSchema);

export default Water;