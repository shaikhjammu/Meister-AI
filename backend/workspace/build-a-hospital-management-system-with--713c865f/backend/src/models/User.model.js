import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin","Doctor","Receptionist","Patient"], default: "Patient" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
