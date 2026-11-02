import { create } from "zustand";
import blogService from "../services/blogs";

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
    addCommentToBlog: (commentedBlog, newComment) => {
      set((state) => ({
        blogs: state.blogs.map((blog) => {
          return blog.id === commentedBlog.id
            ? { ...blog, comments: [...blog.comments, newComment] }
            : blog;
        }),
      }));
    },
    initializeBlogs: async () => {
      const fetchedBlogs = await blogService.getAll();
      set({ blogs: fetchedBlogs });
    },
  },
}));

export const useBlogs = () => blogsStore((state) => state.blogs);
export const useBlogsControls = () => blogsStore((state) => state.actions);
