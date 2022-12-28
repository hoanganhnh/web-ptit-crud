import { IOrder } from "../shared/interface/order";
import axiosClient from "./axios-client";

export const getAllOrder = async () => {
  const { data } = await axiosClient.post<IOrder[]>("orders/my-order");
  return data;
};
