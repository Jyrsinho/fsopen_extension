import { Link } from "react-router-dom";
import { useBlogs } from "../stores/blogsStore.js";
import { useLoggedUser } from "../stores/loggedUserStore.js";

const Blogs = () => {
  const loggedUser = useLoggedUser();
  const blogs = useBlogs();

  console.log("Blogs LoggedUser", loggedUser);
  console.log("Blogs blogs", blogs);

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
