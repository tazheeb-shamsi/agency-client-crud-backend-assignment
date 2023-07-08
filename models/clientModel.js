import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  totalBill: { type: Number, required: true },
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
  },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
