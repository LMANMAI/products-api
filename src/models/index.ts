import * as mongoose from "mongoose";
import { Model } from "mongoose";
type ProductType = ProductModel & mongoose.Document;

interface Size {
  size: string;
  qty: string;
}
export interface ProductModel {
  name: string;
  relaseYear: string;
  posterPathImage: string;
  price: number;
  quantity: number;
  brand: string;
  createdAt: Date;
  imgs: string[];
  genre: string;
  sizes: Size[];
}
const sizeSchema = new mongoose.Schema({
  size: String,
  qty: String,
});

const ProductSchema = new mongoose.Schema({
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
const Product: Model<ProductType> = mongoose.model<ProductType>(
  "Product",
  ProductSchema
);

export default Product;
