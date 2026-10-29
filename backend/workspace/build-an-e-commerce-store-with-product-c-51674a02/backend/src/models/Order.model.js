import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    items: { type: Array, required: false },
    status: { type: String, required: false }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
