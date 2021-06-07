import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  request: { type: Date, required: true },
  patient: { type: String, required: true },
  doctor: { type: String, required: false },
  date: { type: Date, required: false },
  status: { type: String, required: false },
  modality: { type: String, required: false },
  place: { type: String, required: false },
  files: [{ type: String, required: false }],
});

export default mongoose.model("Appointments", AppointmentSchema);
