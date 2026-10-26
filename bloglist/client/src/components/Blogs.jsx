import { Link } from "react-router-dom";
import { useEffect } from "react";
import blogService from "../services/blogs.js";
import useNotification from "../stores/useNotification.js";
import useBlogs from "../stores/useBlogs.js";

//TODO - blogs hakee kaikki blogit

const Blogs = ({ loggedUser }) => {
  const { setNotification } = useNotification();
  const { blogs, setBlogsToStore } = useBlogs((state) => state);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setNotification({
          message: "successfully fetched blogs",
          status: "success",
        });
        setBlogsToStore(blogs);
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

  if (!loggedUser) return null;

  // näytetään vain käyttäjän itse lisäämät blogit
  const filteredBlogs = blogs.filter(
    (blog) => blog.user.username === loggedUser.username,
  );

  return (
    <div>
      <h3>blogs:</h3>
      <ul>
        {filteredBlogs.map((blog) => {
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
