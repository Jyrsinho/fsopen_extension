import { Link } from "react-router-dom";
import { useLoggedUser } from "../stores/loggedUserStore.js";
import { List } from "@mui/material";

const Blogs = ({ blogs }) => {
  const loggedUser = useLoggedUser();

  console.log("Blogs LoggedUser", loggedUser);
  console.log("Blogs blogs", blogs);

  if (!loggedUser || !blogs) return null;

  return (
    <div>
      <ul>
        {blogs.map((blog) => {
          return (
            <List key={blog.id} className="blog-link">
              <Link
                to={`/blogs/${blog.id}`}
              >{`${blog.title} by ${blog.author}`}</Link>
            </List>
          );
        })}
      </ul>
    </div>
  );
};
export default Blogs;
