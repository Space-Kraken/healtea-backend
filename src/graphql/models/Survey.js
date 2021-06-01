import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema({
  patient: { type: String, required: true },
  date: { type: Date, required: false },
  answers: { type: String, required: true },
  modality: { type: String, required: true },
  other: { type: String, required: false },
  completed: { type: Boolean, required: true },
});

export default mongoose.model("Surveys", SurveySchema);
