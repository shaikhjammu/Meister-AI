import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);
