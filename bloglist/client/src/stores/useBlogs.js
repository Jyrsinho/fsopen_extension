import { create } from "zustand";

const useBlogs = create((set) => ({
  blogs: [],
  setBlogsToStore: (blogs) => set({ blogs }),
  addBlogToStore: (newBlog) =>
    set((state) => ({ blogs: [...state.blogs, newBlog] })),
  removeBlogFromStore: (idToRemove) => {
    set((state) => state.blogs.filter((blog) => blog.id !== idToRemove));
  },
}));

export default useBlogs;
