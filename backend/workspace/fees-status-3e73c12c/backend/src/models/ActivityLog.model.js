import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
