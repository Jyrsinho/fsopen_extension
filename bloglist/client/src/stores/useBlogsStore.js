import { create } from "zustand";

const useBlogsStore = create((set) => ({
  blogs: [],
  actions: {
    setBlogsToStore: (blogs) => set({ blogs }),
    addBlogToStore: (newBlog) =>
      set((state) => ({ blogs: [...state.blogs, newBlog] })),
    removeBlogFromStore: (idToRemove) => {
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== idToRemove),
      }));
    },
  },
}));

export const useBlogs = () => useBlogsStore((state) => state.blogs);
export const useBlogsControls = () => useBlogsStore((state) => state.actions);
