import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
