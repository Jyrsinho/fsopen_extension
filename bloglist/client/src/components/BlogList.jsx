import { List } from "@mui/material";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  if (!blogs) return null;

  return (
    <List>
      {blogs.map((blog) => {
        return (
          <Link
            to={`/blogs/${blog.id}`}
            key={blog.id}
          >{`${blog.title} by ${blog.author}`}</Link>
        );
      })}
    </List>
  );
};

export default BlogList;
