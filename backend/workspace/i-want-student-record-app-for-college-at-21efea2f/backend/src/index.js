import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import classRoutes from "./routes/class.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import gradeRoutes from "./routes/grade.routes.js";
import timetableRoutes from "./routes/timetable.routes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", app: "School & Student Portal System" }));

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classs", classRoutes);
app.use("/api/attendances", attendanceRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/timetables", timetableRoutes);

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
  app.listen(PORT, () => console.log(`School & Student Portal System API listening on port ${PORT}`));
}

start();

export default app;
