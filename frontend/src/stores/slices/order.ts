import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosClient from "../../services/axios-client";
import { IOrder } from "../../shared/interface/order";
import { RootState } from "../store";

export const getMyOrder = createAsyncThunk(
  "orders/my-order",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("orders/my-order");
      return res.data as IOrder[];
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

interface IState {
  orders: { id: string }[];
}

const initialState: IState = {
  orders: [],
};

const orderSplice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrdersStore: (state, action: { payload: { id: string }[] }) => {
      state.orders = action.payload;
    },
    updateOrder: (state, action: { payload: { id: string } }) => {
      const existedOrder = state.orders.filter(
        (order) => order.id === action.payload.id
      ).length;

      if (!existedOrder) {
        state.orders.push(action.payload);
      } else {
        state.orders = [...state.orders].filter(
          (order) => order.id !== action.payload.id
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getMyOrder.fulfilled,
      (state, action: { payload: IOrder[] }) => {
        state.orders = action.payload;
      }
    );
  },
});

export const { setOrdersStore, updateOrder } = orderSplice.actions;

export const ordersSelector = (state: RootState) => state.order;

const orderReducer = orderSplice.reducer;
export default orderReducer;
