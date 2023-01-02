import { IOrder } from "../shared/interface/order";
import axiosClient from "./axios-client";

export const getAllOrder = async () => {
  const { data } = await axiosClient.post<IOrder[]>("orders/my-order");
  return data;
};

export const createOrder = async ({
  amount,
  bookId,
}: {
  amount: number;
  bookId: string;
}) => {
  const { data } = await axiosClient.post("orders", {
    amount,
    bookId,
  });

  return data;
};

export const deleteOrder = async (id: string) => {
  return await axiosClient.delete(`orders/${id}`);
};
