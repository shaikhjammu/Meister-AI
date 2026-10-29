import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
