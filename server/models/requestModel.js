import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

export const Request = mongoose.model("Request", requestSchema);
