import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, required: false }
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
