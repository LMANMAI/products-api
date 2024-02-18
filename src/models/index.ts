import * as mongoose from "mongoose";
import { Model } from "mongoose";
type ProductType = ProductModel & mongoose.Document;

interface Size {
  size: string;
  qty: string;
}
interface Discount {
  promotionActive: boolean;
  previosPrice: number;
  discountPercentage: number;
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
  hasModifications: Discount;
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
  hasModifications: {
    promotionActive: Boolean,
    previosPrice: Number,
    discountPercentage: Number,
  },
});
const Product: Model<ProductType> = mongoose.model<ProductType>(
  "Sneaker",
  ProductSchema
);

export default Product;
