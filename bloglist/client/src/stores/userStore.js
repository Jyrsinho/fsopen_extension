import { create } from "zustand";

const userStore = create((set) => ({
  users: [],
  actions: {
    setUsers: (users) => set({ users }),
  },
}));

export const useUsers = () => userStore((state) => state.users);
export const useUserControls = () => userStore((state) => state.actions);
