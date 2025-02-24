import axios from "axios";
import { api } from "../api/api";

interface AuthResponse {
  token?: string;
  id?: number;
  name: string;
  email: string;
  phone?: string;
  password?: string;
}
interface LoginData {
  email: string;
  password: string;
}

export const loginService = async (
  credentials: LoginData
): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erro ao fazer login");
    }
    throw new Error("Erro inesperado ao fazer login");
  }
};

export const registerService = async (
  request: AuthResponse
): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>("/auth/register", request);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Erro ao cadastrar no sistema"
      );
    }
    throw new Error("Erro inesperado ao cadastrar no sistema");
  }
};
