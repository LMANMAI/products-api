import { Document } from "mongoose";

export class GetSneakersDto {
  brand?: string;
  name?: string;
  genre?: string;
}

interface ISize {
  size: string;
  qty: string;
}
export interface ISneaker extends Document {
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
