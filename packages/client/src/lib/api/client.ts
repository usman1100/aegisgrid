import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useMemo } from "react";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!VITE_API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}

export const useApiClient = () => {
  const { getToken } = useAuth();

  const client = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: VITE_API_BASE_URL,
    });

    axiosInstance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return axiosInstance;
  }, [getToken]);

  return client;
};
