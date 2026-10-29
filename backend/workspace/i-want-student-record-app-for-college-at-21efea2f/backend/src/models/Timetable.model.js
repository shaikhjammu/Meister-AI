import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Timetable = mongoose.model("Timetable", timetableSchema);
