import axios, { AxiosError, AxiosResponse } from "axios";
import { error } from "console";
import { useAuthStore } from "~/store/auth";

export const api = axios.create({
  baseURL: "https://sme-api.onrender.com/",
});

const getToken = () => {
  return useAuthStore.getState().token; // Obtém o token sem chamar o hook diretamente
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const logout = useAuthStore.getState().logout;

    if (error.status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);
