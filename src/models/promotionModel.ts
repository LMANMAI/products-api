import * as mongoose from "mongoose";
import { Model } from "mongoose";
export interface PromotionModel {
  afectedProduct: {
    genre: string;
    size: number;
    brand: string;
  };
  discountMount: number;
}

type PromotionType = PromotionModel & mongoose.Document;

const PromotionSchema = new mongoose.Schema({
  afectedProduct: {
    genre: String,
    size: Number,
    brand: String,
  },
  discountAmount: Number,
});
const Sneaker: Model<PromotionType> = mongoose.model<PromotionType>(
  "Promotion",
  PromotionSchema
);

export default Sneaker;
