import mongoose from "mongoose";

const MedicalRecordSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  status: { type: String, required: true },
  appointments: [{ type: String, required: true }],
  surveys: [{ type: String, required: false }],
  recipes: [{ type: String, required: false }],
  tests: [{ type: String, required: false }],
});

export default mongoose.model("MedicalRecord", MedicalRecordSchema);
