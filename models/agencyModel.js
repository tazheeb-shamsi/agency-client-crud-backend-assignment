import mongoose from "mongoose";

const agencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  clients: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  ],
});

const Agency = mongoose.model("Agency", agencySchema);

export default Agency;
