import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  requester: { type: String, required: true },
  patient: { type: String, required: true },
  status: { type: String, required: false },
  type: { type: String, required: true },
  resoult: { type: String, required: false },
  laboratory: { type: String, required: true },
  files: [{ type: String, required: false }],
});

export default mongoose.model("Tests", TestSchema);
