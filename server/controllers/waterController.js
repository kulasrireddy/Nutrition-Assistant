import Water from "../models/Water.js";

// Add water intake
export const addWater = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Water amount is required",
      });
    }

    const water = await Water.create({
      user: req.user._id,
      amount,
    });

    res.status(201).json({
      success: true,
      message: "Water intake added successfully",
      water,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to add water intake",
    });
  }
};

// Get today's water intake
export const getTodayWater = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const records = await Water.find({
      user: req.user._id,
      date: {
        $gte: start,
        $lte: end,
      },
    });

    const total = records.reduce((sum, item) => sum + item.amount, 0);

    res.json({
      success: true,
      totalWater: total,
      records,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch water intake",
    });
  }
};

// Delete a water record
export const deleteWater = async (req, res) => {
  try {
    const water = await Water.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!water) {
      return res.status(404).json({
        success: false,
        message: "Water record not found",
      });
    }

    res.json({
      success: true,
      message: "Water record deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to delete water record",
    });
  }
};