import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosClient from "../../services/axios-client";
import { ILogin, ISignUp } from "../../shared/interface/auth";
import { IUser } from "../../shared/interface/user";
import { Role } from "../../shared/types/Role";
import { RootState } from "../store";

export const login = createAsyncThunk(
  "auth/signin",
  async (values: ILogin, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("auth/signin", values);
      return res.data as IUser;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (values: ISignUp, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("auth/signup", values);
      return res.data as IUser;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

interface IState {
  auth: IUser["user"] | null;
  isLoading: boolean;
  accessToken: IUser["accessToken"];
}

const initialState: IState = {
  auth: null,
  isLoading: false,
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    setToken: (state, action: { payload: IUser["accessToken"] }) => {
      state.accessToken = action.payload;
    },
    setAuth: (state, action: { payload: IUser["user"] }) => {
      state.auth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: { payload: any }) => {
      state.auth = action.payload;
      state.isLoading = false;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.rejected, (state) => {
      state.auth = null;
      state.isLoading = false;
    });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const selectAdmin = (state: RootState) => {
  const roles = state.auth.auth?.roles;

  if (roles) {
    return roles.includes(Role.ADMIN);
  }

  return false;
};

export const isAuthenticated = (state: RootState) => {
  const currentUser = selectAuth(state);
  return !!currentUser.auth;
};

export const { logout, setToken, setAuth } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
