import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: false },
    phone: { type: String, required: false }
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
