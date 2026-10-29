import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
