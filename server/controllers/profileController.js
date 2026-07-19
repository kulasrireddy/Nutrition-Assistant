import User from "../models/User.js";

// Get logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve profile",
    });
  }
};

// Update logged-in user's profile
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      profession,
      age,
      gender,
      height,
      weight,
      goal,
      activityLevel,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (profession !== undefined) {
      user.profession = profession;
    }

    if (age !== undefined) {
      user.age = age === "" ? null : Number(age);
    }

    if (gender !== undefined) {
      user.gender = gender;
    }

    if (height !== undefined) {
      user.height = height === "" ? null : Number(height);
    }

    if (weight !== undefined) {
      user.weight = weight === "" ? null : Number(weight);
    }

    if (goal !== undefined) {
      user.goal = goal;
    }

    if (activityLevel !== undefined) {
      user.activityLevel = activityLevel;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profession: updatedUser.profession,
        age: updatedUser.age,
        gender: updatedUser.gender,
        height: updatedUser.height,
        weight: updatedUser.weight,
        goal: updatedUser.goal,
        activityLevel: updatedUser.activityLevel,
        profileImage: updatedUser.profileImage,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

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
      message: "Unable to update profile",
    });
  }
};