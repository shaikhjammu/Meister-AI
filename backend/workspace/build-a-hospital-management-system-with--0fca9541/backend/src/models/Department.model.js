import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);
