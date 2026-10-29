import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Exercise = mongoose.model("Exercise", exerciseSchema);
