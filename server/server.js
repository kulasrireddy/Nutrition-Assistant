import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import waterRoutes from "./routes/waterRoutes.js";
import bmiRoutes from "./routes/bmiRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

const app = express();

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NutriPulse API is running successfully",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/bmi", bmiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("----------------------------------");
  console.log("NutriPulse backend is running");
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log("Allowed frontend URLs:");
  allowedOrigins.forEach((origin) => console.log(origin));
  console.log("----------------------------------");
});