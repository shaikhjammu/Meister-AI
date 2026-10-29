import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
