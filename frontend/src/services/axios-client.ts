import axios, { AxiosError } from "axios";

import { store } from "../stores";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  responseType: "json",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

axiosClient.interceptors.request.use(async (request) => {
  const token = store.getState().auth.accessToken;
  if (request && token) {
    request.headers = {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${token}`,
    };
  }
  return request;
});

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export default axiosClient;
