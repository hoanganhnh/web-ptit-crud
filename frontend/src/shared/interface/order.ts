import { IBook } from "./book";

export interface IOrder {
  id: string;
  amount: number;
  book: IBook;
}
