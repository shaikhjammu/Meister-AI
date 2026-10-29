import mongoose from "mongoose";

const boardColumnSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const BoardColumn = mongoose.model("BoardColumn", boardColumnSchema);
