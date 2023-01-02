import { IComment } from "../shared/interface/comment";
import axiosClient from "./axios-client";

export const createComment = async ({
  content,
  rate,
  bookId,
}: {
  content: string;
  rate: number;
  bookId: string;
}) => {
  const { data } = await axiosClient.post<IComment>("comments", {
    content,
    rate,
    bookId,
  });

  return data;
};

export const deleteComment = async (commentId: number) => {
  const { data } = await axiosClient.delete(`comments/${commentId}`);
  return data;
};
