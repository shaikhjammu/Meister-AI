import mongoose from "mongoose";

const fileOrganizerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const FileOrganizer = mongoose.model("FileOrganizer", fileOrganizerSchema);
