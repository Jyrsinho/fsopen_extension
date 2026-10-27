import { create } from "zustand";

const blogsStore = create((set) => ({
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

export const useBlogs = () => blogsStore((state) => state.blogs);
export const useBlogsControls = () => blogsStore((state) => state.actions);
