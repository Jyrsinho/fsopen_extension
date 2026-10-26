import { Button, ButtonGroup, Card } from "@mui/material";

const Blog = ({ blog, addALike, removeBlog, loggedUser }) => {
  const addedByUser = loggedUser?.username === blog?.user.username;

  if (!blog) return null;

  return (
    <Card>
      <ul className="blogContainer">
        <li>
          <h2>
            {blog.title} by {blog.author}
          </h2>
        </li>
        <li>
          <a onClick={() => console.log(blog.url)} href={`https://${blog.url}`}>
            {blog.url}
          </a>
        </li>
        <li>Added by {blog.user.name}</li>
        <li data-testid={"likes"}> likes: {blog.likes}</li>
      </ul>
      <ButtonGroup size="medium">
        {addedByUser && (
          <Button color={"warning"} onClick={() => removeBlog(blog)}>
            Remove
          </Button>
        )}
        {loggedUser && <Button onClick={() => addALike(blog)}>like</Button>}
      </ButtonGroup>
    </Card>
  );
};

export default Blog;
