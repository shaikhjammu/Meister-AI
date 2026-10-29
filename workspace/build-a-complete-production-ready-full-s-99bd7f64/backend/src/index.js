import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import boardColumnRoutes from "./routes/boardColumn.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import tagRoutes from "./routes/tag.routes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", app: "Kanban Task & Project Management System" }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/boardColumns", boardColumnRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/tags", tagRoutes);

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
  app.listen(PORT, () => console.log(`Kanban Task & Project Management System API listening on port ${PORT}`));
}

start();

export default app;
