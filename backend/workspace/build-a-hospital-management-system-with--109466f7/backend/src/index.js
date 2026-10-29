import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import medicalRecordRoutes from "./routes/medicalRecord.routes.js";
import prescriptionRoutes from "./routes/prescription.routes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", app: "Hospital Management System" }));

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medicalRecords", medicalRecordRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

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
  app.listen(PORT, () => console.log(`Hospital Management System API listening on port ${PORT}`));
}

start();

export default app;
