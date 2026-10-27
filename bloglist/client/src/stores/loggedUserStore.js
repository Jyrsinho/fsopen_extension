import { create } from "zustand";

const loggedUserStore = create((set) => ({
  loggedUser: null,
  actions: {
    setLoggedUser: (newUser) => set({ loggedUser: newUser }),
  },
}));

export const useLoggedUser = () => loggedUserStore((state) => state.loggedUser);
export const useLoggedUserControls = () =>
  loggedUserStore((state) => state.actions);
