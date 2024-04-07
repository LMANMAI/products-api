import mongoose, { Schema, Document } from "mongoose";

interface Item {
  id: string;
  category_id: string;
  currency_id: string;
  description: string;
  picture_url: string | null;
  title: string;
  quantity: number;
  unit_price: number;
}

interface Purchase extends Document {
  userId: string;
  items: Item[];
  orderId: string;
}

const itemSchema = new Schema<Item>({
  id: { type: String, required: true },
  category_id: { type: String },
  currency_id: { type: String, required: true },
  description: { type: String, required: true },
  picture_url: { type: String, default: null },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true },
});

const purchaseSchema = new Schema<Purchase>({
  userId: { type: String, required: true },
  orderId: { type: String, required: true },
  items: [itemSchema],
});

const PurchaseModel = mongoose.model<Purchase>("Purchase", purchaseSchema);

export default PurchaseModel;
