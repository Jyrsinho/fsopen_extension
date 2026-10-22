import { create } from "zustand";

const useBlogs = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  addABlog: (newBlog) => set((state) => ({ blogs: [...state.blogs, newBlog] })),
}));

export default useBlogs;
