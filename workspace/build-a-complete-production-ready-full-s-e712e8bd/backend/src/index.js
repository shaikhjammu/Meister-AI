import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import workoutPlanRoutes from "./routes/workoutPlan.routes.js";
import exerciseRoutes from "./routes/exercise.routes.js";
import mealLogRoutes from "./routes/mealLog.routes.js";
import macroNutrientRoutes from "./routes/macroNutrient.routes.js";
import progressRecordRoutes from "./routes/progressRecord.routes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", app: "Fitness & Nutrition Tracker App" }));

app.use("/api/auth", authRoutes);
app.use("/api/workoutPlans", workoutPlanRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/mealLogs", mealLogRoutes);
app.use("/api/macroNutrients", macroNutrientRoutes);
app.use("/api/progressRecords", progressRecordRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    } else {
      console.warn("MONGODB_URI not set — running without a database connection");
    }
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
  app.listen(PORT, () => console.log(`Fitness & Nutrition Tracker App API listening on port ${PORT}`));
}

start();

export default app;
