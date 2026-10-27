import { create } from "zustand";
import userService from "../services/users.js";

const userStore = create((set) => ({
  users: [],
  actions: {
    setUsers: (users) => set({ users }),
    initializeUsers: async () => {
      const fetchedUsers = await userService.getAll();
      set({ users: fetchedUsers });
    },
  },
}));

export const useUsers = () => userStore((state) => state.users);
export const useUserControls = () => userStore((state) => state.actions);
