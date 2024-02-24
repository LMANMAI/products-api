import * as mongoose from "mongoose";
import { Model } from "mongoose";
export interface PromotionModel {
  afectedProduct: {
    genre: string;
    brand: string;
  };
  discountMount: number;
  replaceExistedPromotion: boolean;
}

type PromotionType = PromotionModel & mongoose.Document;

const PromotionSchema = new mongoose.Schema({
  afectedProduct: {
    genre: String,
    brand: String,
  },
  discountAmount: Number,
  replaceExistedPromotion: Boolean,
});
const Product: Model<PromotionType> = mongoose.model<PromotionType>(
  "Promotion",
  PromotionSchema
);

export default Product;
