import * as mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  size: String,
  qty: String,
});

export const SneakerSchema = new mongoose.Schema({
  name: { trim: true, type: String },
  relaseYear: String,
  posterPathImage: String,
  price: Number,
  quantity: Number,
  brand: { trim: true, type: String },
  createdAt: { type: Date, default: Date.now },
  imgs: [{ type: String, max: 3 }],
  genre: { type: String, trim: true },
  sizes: [sizeSchema],
});
export const SneakerModel = mongoose.model("SneakerModel", SneakerSchema);
module.exports = mongoose.model("SneakerSchema", SneakerSchema);
