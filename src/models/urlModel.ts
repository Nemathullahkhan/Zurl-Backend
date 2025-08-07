import mongoose, { mongo } from "mongoose";

const urlModel = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
});
export const UrlModel = mongoose.model("Url", urlModel);
