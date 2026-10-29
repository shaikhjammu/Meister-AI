import mongoose from "mongoose";

const progressRecordSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const ProgressRecord = mongoose.model("ProgressRecord", progressRecordSchema);
