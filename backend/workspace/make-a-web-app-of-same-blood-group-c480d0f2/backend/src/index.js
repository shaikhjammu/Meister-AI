import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import itemRoutes from "./routes/item.routes.js";
import recordRoutes from "./routes/record.routes.js";
import activityRoutes from "./routes/activity.routes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", app: "A web app of same blood group" }));

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/activitys", activityRoutes);

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
  app.listen(PORT, () => console.log(`A web app of same blood group API listening on port ${PORT}`));
}

start();

export default app;
