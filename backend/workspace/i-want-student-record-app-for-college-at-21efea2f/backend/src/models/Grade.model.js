import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Grade = mongoose.model("Grade", gradeSchema);
