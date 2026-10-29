import mongoose from "mongoose";

const macroNutrientSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

export const MacroNutrient = mongoose.model("MacroNutrient", macroNutrientSchema);
