import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: false }
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
