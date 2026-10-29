import mongoose from "mongoose";

const mealLogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const MealLog = mongoose.model("MealLog", mealLogSchema);
