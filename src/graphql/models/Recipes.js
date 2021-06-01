import mongoose from "mongoose";

const RecipesSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  treatment: { type: String, required: true },
  file: { type: String, required: false },
});

export default mongoose.model("Recipes", RecipesSchema);
