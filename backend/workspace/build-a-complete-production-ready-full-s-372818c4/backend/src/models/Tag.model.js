import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Tag = mongoose.model("Tag", tagSchema);
