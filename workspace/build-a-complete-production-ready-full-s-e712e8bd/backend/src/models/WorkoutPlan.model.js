import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);
