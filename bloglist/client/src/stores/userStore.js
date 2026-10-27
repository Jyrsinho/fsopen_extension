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
          user.id === loggedUser.id
            ? { ...user, blogs: [...user.blogs, newBlog] }
            : user,
        ),
      }));
    },
    removeBlogFromUser: (loggedUser, blogToRemoveID) => {
      set((state) => ({
        users,
      }));
    },
  },
}));

export const useUsers = () => userStore((state) => state.users);
export const useUserControls = () => userStore((state) => state.actions);
