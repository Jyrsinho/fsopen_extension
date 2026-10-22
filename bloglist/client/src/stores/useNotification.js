import { create } from "zustand";

const useNotification = create((set) => ({
  notification: {
    message: "default notification from zustand",
    status: "success",
  },
  setNotification: (notification) => {
    console.log("setting message", notification);
    set({ notification });
  },
  resetNotification: () => {
    set({ notification: null });
  },
}));

export default useNotification;
