import mongoose from "mongoose";

const FilesSchema = new mongoose.Schema({
  type: { type: String, required: true },
  filename: { type: String, required: true },
  mimeType: { type: String, required: true },
  path: { type: String, required: true },
});

export default mongoose.model("Files", FilesSchema);
