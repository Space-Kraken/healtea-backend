import mongoose from "mongoose";

const TraceablilitySchema = new mongoose.Schema({
  user: { type: String, required: true },
  exposedUsers: [{ type: String, required: false }],
  active: { type: Boolean, required: true },
});

export default mongoose.model("Traceablility", TraceablilitySchema);
