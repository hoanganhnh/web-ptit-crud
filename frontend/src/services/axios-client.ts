import axios from "axios";

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

export default axiosClient;
