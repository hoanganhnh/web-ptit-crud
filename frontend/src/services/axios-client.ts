import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
    platform: "web",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosClient;
