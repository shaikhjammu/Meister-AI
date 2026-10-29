import mongoose from "mongoose";

const codeSnippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const CodeSnippet = mongoose.model("CodeSnippet", codeSnippetSchema);
