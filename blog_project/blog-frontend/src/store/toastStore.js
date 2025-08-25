import { create } from "zustand";

export const useToastStore = create((set) => ({
  show: false,
  message: "",
  type: "info", // "success", "error", "confirm"
  onConfirm: null, // callback for confirm OK

  showToast: (message, type = "success") => {
    set({ show: true, message, type, onConfirm: null });
  },

  showConfirm: (message, onConfirm) => {
    set({ show: true, message, type: "confirm", onConfirm });
  },

  hideToast: () => set({ show: false, message: "", type: "info", onConfirm: null }),
}));
