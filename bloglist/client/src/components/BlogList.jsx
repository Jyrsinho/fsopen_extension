import { List, ListItem } from "@mui/material";

const BlogList = ({ blogs }) => {
  if (!blogs) return null;

  return (
    <List>
      {blogs.map((blog) => {
        return (
          <ListItem key={blog.id}>{`${blog.title} by ${blog.author}`}</ListItem>
        );
      })}
    </List>
  );
};

export default BlogList;
