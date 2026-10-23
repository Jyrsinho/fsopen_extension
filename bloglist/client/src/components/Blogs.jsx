import Blog from "./Blog.jsx";
import { Link } from "react-router-dom";

const Blogs = ({ blogs, loggedUser }) => {
  if (!blogs || !loggedUser) return null;
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
