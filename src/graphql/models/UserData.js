import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  address: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  tel: { type: String, required: true },
});

export default mongoose.model("UserData", UserDataSchema);
