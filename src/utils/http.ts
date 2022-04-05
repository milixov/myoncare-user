import axios, { AxiosInstance } from "axios";

export const http: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60 * 1000,
});

http.interceptors.response.use((response) => {
  if (response.status === 401) {
    window.location.href = "/login";
  }

  return response.data;
});
