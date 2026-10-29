import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);
