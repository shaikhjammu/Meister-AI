import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, required: true },
    medication: { type: String, required: true },
    dosage: { type: String, required: false }
  },
  { timestamps: true }
);

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
