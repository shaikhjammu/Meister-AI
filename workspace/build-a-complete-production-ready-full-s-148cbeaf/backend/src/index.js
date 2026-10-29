import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import voiceCommandRoutes from "./routes/voiceCommand.routes.js";
import fileOrganizerRoutes from "./routes/fileOrganizer.routes.js";
import emailSummaryRoutes from "./routes/emailSummary.routes.js";
import codeSnippetRoutes from "./routes/codeSnippet.routes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", app: "AI Operating System & Voice Assistant" }));

app.use("/api/auth", authRoutes);
app.use("/api/voiceCommands", voiceCommandRoutes);
app.use("/api/fileOrganizers", fileOrganizerRoutes);
app.use("/api/emailSummarys", emailSummaryRoutes);
app.use("/api/codeSnippets", codeSnippetRoutes);

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
  app.listen(PORT, () => console.log(`AI Operating System & Voice Assistant API listening on port ${PORT}`));
}

start();

export default app;
