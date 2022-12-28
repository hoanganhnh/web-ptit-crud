import { IBook } from "../shared/interface/book";
import axiosClient from "./axios-client";

export const getAllBook = async () => {
  const { data } = await axiosClient.get<IBook[]>("books");
  return data;
};

export const getBookById = async (id: string) => {
  const { data } = await axiosClient.get<IBook>(`books/${id}`);
  return data;
};
