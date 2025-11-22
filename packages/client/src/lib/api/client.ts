import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!VITE_API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}

export const useApiClient = () => {
  const { getToken, isSignedIn } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      getToken().then((token) => {
        setToken(token);
      });
    }
  }, [isSignedIn, getToken]);

  const client = useMemo(() => {
    console.log(VITE_API_BASE_URL);

    return axios.create({
      baseURL: VITE_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return client;
};
