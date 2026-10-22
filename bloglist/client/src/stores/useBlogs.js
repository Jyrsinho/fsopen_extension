import { create } from "zustand";

const useBlogs = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  addABlog: (newBlog) => set((state) => ({ blogs: [...state.blogs, newBlog] })),
}));

/*
const useBear = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

 */

export default useBlogs;
