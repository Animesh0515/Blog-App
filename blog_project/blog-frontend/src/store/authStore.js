import { create } from "zustand";

export const useAuthStore = create((set) => {
  // Initialize from localStorage
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const savedToken = localStorage.getItem("token");

  return {
    user: savedUser || null,
    token: savedToken || null,

    login: (userData, token) => {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      set({ user: userData, token });
    },

    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null });
    },
  };
});
