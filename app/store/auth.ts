import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const getLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(getLocalStorageItem("user") || "null"),
  token: getLocalStorageItem("token"),

  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
