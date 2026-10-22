import { create } from "zustand";

const useNotification = create(() => ({
  notification: "default notification from zustand",
}));

export default useNotification;
