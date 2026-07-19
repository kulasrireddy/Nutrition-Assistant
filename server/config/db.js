import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log("----------------------------------");
    console.log("MongoDB connected successfully");
    console.log(`Database host: ${connection.connection.host}`);
    console.log(`Database name: ${connection.connection.name}`);
    console.log("----------------------------------");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;