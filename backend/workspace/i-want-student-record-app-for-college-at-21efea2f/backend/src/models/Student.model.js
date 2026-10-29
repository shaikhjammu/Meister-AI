import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
