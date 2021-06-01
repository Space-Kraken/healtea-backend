import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
  rolType: { type: String, required: true },
});

export default mongoose.model("Roles", RolesSchema);
