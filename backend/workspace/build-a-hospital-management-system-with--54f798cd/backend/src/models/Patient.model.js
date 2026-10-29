import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    phone: { type: String, required: false }
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
