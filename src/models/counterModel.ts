import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "urlCounter",
    required: true,
  },
  val: {
    type: Number,
    required: true,
    default: 0,
  },
  urlConnected: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Url",
  },
});

export const CounterModel = mongoose.model("Counter", counterSchema);
