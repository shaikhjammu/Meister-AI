import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, required: true },
    notes: { type: String, required: false },
    diagnosis: { type: String, required: false }
  },
  { timestamps: true }
);

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
