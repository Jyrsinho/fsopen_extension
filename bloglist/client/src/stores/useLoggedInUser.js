import { create } from "zustand";

const useLoggedInUser = create((set) => ({
  loggedUser: null,
  setLoggedUser: (newUser) => set({ loggedUser: newUser }),
}));

export default useLoggedInUser;
