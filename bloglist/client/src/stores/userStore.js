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
    addBlogToUser: (loggedUser, newBlog) => {
      set((state) => ({
        users: state.users.map((user) =>
          user.name === loggedUser.name
            ? { ...user, blogs: [...user.blogs, newBlog] }
            : user,
        ),
      }));
    },
  },
}));

export const useUsers = () => userStore((state) => state.users);
export const useUserControls = () => userStore((state) => state.actions);
