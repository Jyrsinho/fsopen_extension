import { create } from "zustand";

const notificationStore = create((set) => ({
  notification: null,
  actions: {
    setNotification: (notification) => {
      console.log("setting message", notification);
      set({ notification });
    },
    resetNotification: () => {
      set({ notification: null });
    },
  },
}));

export const useNotification = () =>
  notificationStore((state) => state.notification);
export const useNotificationControls = () =>
  notificationStore((state) => state.actions);
