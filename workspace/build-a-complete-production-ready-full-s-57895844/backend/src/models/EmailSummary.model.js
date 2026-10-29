import mongoose from "mongoose";

const emailSummarySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const EmailSummary = mongoose.model("EmailSummary", emailSummarySchema);
