import { IComment } from "./comment";

export interface IBook {
  id: number;
  title: string;
  author: string;
  description: string;
  publicDate: string;
  page: number;
  price: number;
  category: string;
  image: IImgageBook;
  comments: Array<IComment>;
}

export interface IImgageBook {
  id: string;
  path: string;
  url: string;
}
