import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  try {
    await mongoose.connect(env.mongoUri, {
      dbName: env.dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("📦 Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});
