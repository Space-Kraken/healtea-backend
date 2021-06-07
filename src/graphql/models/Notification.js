import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  user: { type: String, required: true },
  notifications: [
    {
      date: { type: Date, required: true },
      title: { type: String, required: true },
      message: { type: String, required: true },
      type: { type: String, required: true },
      target: { type: String, required: true },
    },
  ],
});
export default mongoose.model("Notifications", NotificationSchema);
