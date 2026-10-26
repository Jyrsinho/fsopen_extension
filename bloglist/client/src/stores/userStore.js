import { create } from "zustand";

const userStore = create((set) => ({
  loggedUser: null,
  actions: {
    setLoggedUser: (newUser) => set({ loggedUser: newUser }),
  },
}));

export const useUser = () => userStore((state) => state.loggedUser);
export const useUserControls = () => userStore((state) => state.actions);
