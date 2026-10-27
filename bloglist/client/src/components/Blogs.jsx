import { Link } from "react-router-dom";
import { useEffect } from "react";
import blogService from "../services/blogs.js";
import { useBlogs, useBlogsControls } from "../stores/blogsStore.js";
import { useNotificationControls } from "../stores/notificationStore.js";
import { useUser } from "../stores/userStore.js";

const Blogs = () => {
  const { setNotification } = useNotificationControls();
  const loggedUser = useUser();
  const blogs = useBlogs();
  const { setBlogsToStore } = useBlogsControls();

  console.log("Blogs - ", blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.getAll();
        console.log("fetchedBlogs : ", fetchedBlogs);
        setNotification({
          message: "successfully fetched blogs",
          status: "success",
        });
        setBlogsToStore(fetchedBlogs);
      } catch (error) {
        console.log(error);
        setNotification({
          status: "error",
          message: error.message,
        });
      }
    };
    fetchBlogs();
  }, [setNotification, loggedUser, setBlogsToStore]);

  if (!loggedUser || !blogs) return null;

  return (
    <div>
      <h3>blogs:</h3>
      <ul>
        {blogs.map((blog) => {
          return (
            <li key={blog.id} className="blog-link">
              <Link
                to={`/blogs/${blog.id}`}
              >{`${blog.title} by ${blog.author}`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Blogs;
