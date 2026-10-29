import mongoose from "mongoose";

const voiceCommandSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const VoiceCommand = mongoose.model("VoiceCommand", voiceCommandSchema);
