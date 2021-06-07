import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  notifications: [{ type: String, required: true }],
  image: { type: String, required: false },
});

export default mongoose.model("Users", UserSchema);
