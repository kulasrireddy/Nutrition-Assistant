import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must contain at least 6 characters"],
      select: false,
    },

    profession: {
      type: String,
      enum: [
        "Student",
        "Software Professional",
        "Teacher",
        "Healthcare Professional",
        "Business Professional",
        "Homemaker",
        "Other",
      ],
      default: "Student",
    },

    age: {
      type: Number,
      min: [10, "Age must be at least 10"],
      max: [100, "Age cannot exceed 100"],
      default: null,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      default: "Prefer not to say",
    },

    height: {
      type: Number,
      min: [50, "Height must be at least 50 cm"],
      max: [250, "Height cannot exceed 250 cm"],
      default: null,
    },

    weight: {
      type: Number,
      min: [20, "Weight must be at least 20 kg"],
      max: [400, "Weight cannot exceed 400 kg"],
      default: null,
    },

    goal: {
      type: String,
      enum: [
        "Lose Weight",
        "Maintain Weight",
        "Gain Weight",
        "Build Muscle",
        "Improve Health",
      ],
      default: "Improve Health",
    },

    activityLevel: {
      type: String,
      enum: [
        "Sedentary",
        "Lightly Active",
        "Moderately Active",
        "Very Active",
      ],
      default: "Sedentary",
    },

    profileImage: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving the user
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare login password with saved password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;