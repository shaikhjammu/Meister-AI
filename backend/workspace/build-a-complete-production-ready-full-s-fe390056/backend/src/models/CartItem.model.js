import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const CartItem = mongoose.model("CartItem", cartItemSchema);
