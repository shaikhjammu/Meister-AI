import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js";
import activityLogRoutes from "./routes/activityLog.routes.js";
import reportRoutes from "./routes/report.routes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", app: "A CAFE MANAGEMENT SYSTEM" }));

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/activityLogs", activityLogRoutes);
app.use("/api/reports", reportRoutes);

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
  app.listen(PORT, () => console.log(`A CAFE MANAGEMENT SYSTEM API listening on port ${PORT}`));
}

start();

export default app;
