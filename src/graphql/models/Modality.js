import mongoose from "mongoose";

const ModalitySchema = new mongoose.Schema({
  desc: { type: String, required: true },
});

export default mongoose.model("Modality", ModalitySchema);
