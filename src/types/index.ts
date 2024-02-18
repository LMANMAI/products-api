import { Document } from "mongoose";

export class GetProductsDto {
  brand?: string;
  name?: string;
  genre?: string;
}

interface ISize {
  size: string;
  qty: string;
}
export interface IProduct extends Document {
  readonly name: string;
  readonly relaseYear: string;
  imgs: string[];
  readonly price: number;
  readonly brand: string;
  readonly createdAt: Date;
  posterPathImage: string;
  readonly genre: string;
  readonly sizes: ISize[];
  readonly quantity: Number;
}
