import { create } from "zustand";

const useNotification = create(() => ({
  notification: {
    message: "default notification from zustand",
    status: "success",
  },
}));

export default useNotification;
