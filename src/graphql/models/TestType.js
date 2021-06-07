import mongoose from "mongoose";

const TestTypeSchema = new mongoose.Schema({
  desc: { type: String, required: true },
});

export default mongoose.model("TestType", TestTypeSchema);
