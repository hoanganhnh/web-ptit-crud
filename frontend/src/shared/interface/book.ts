export interface IBook {
  id: number;
  title: string;
  author: string;
  description: string;
  publicDate: string;
  page: number;
  category: string;
  image: IImgageBook;
}

export interface IImgageBook {
  id: string;
  filename: string;
  path: string;
  mimetype: string;
}
