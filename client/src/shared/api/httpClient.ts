// src/shared/httpClient.ts
import axios, { AxiosError } from "axios";
import type {AxiosInstance} from "axios"

const httpClient: AxiosInstance = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default httpClient;
