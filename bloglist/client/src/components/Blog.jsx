import { Button, ButtonGroup, Card } from "@mui/material";
import blogService from "../services/blogs.js";
import { useBlogs, useBlogsControls } from "../stores/blogsStore.js";
import { useNavigate } from "react-router-dom";
import { useNotificationControls } from "../stores/notificationStore.js";
import { useLoggedUser } from "../stores/loggedUserStore.js";
import { useUserControls } from "../stores/userStore.js";
import Comments from "./Comments.jsx";

const Blog = ({ blog }) => {
  const loggedUser = useLoggedUser();
  const addedByUser = loggedUser?.username === blog?.user.username;
  const { setNotification } = useNotificationControls();
  const blogs = useBlogs();
  const { setBlogsToStore, removeBlogFromStore, addCommentToBlog } =
    useBlogsControls();
  const { removeBlogFromUser } = useUserControls();
  const navigate = useNavigate();

  console.log("Blog component...");
  console.log("blog variable- ", blog);

  const addALike = async (likedBlog) => {
    const blogToSave = {
      ...likedBlog,
      likes: likedBlog.likes + 1,
    };
    try {
      const editedBlog = await blogService.put(blogToSave, likedBlog.id);
      const newBlogs = blogs.map((blog) => {
        return blog.id === likedBlog.id ? editedBlog : blog;
      });
      setBlogsToStore(newBlogs);
    } catch (error) {
      setNotification({
        status: "error",
        message: error.message,
      });
    }
  };

  const removeBlog = async (blogToRemove) => {
    const confirm = window.confirm(
      `Are you sure you want to remove ${blogToRemove.title}?`,
    );
    if (!confirm) return;
    try {
      await blogService.deleteBlog(blogToRemove.id);
      removeBlogFromStore(blogToRemove.id);
      removeBlogFromUser(loggedUser, blogToRemove);
      setNotification({
        status: "success",
        message: `Removed blog ${blogToRemove.title} by ${blogToRemove.author}`,
      });
      navigate("/");
    } catch (error) {
      setNotification({
        status: "error",
        message: error.message,
      });
    }
  };

  const addComment = async (comment) => {
    try {
      const mutatedBlog = await blogService.addComment(comment, blog.id);
      console.log("mutatedBlog", mutatedBlog);
      addCommentToBlog(blog, comment);
    } catch (error) {
      console.log("ei onnistunut kommentin lisääminen backendiin");
      setNotification({
        status: "error",
        message: error.message,
      });
    }
  };

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
      <Comments addComment={addComment} comments={blog.comments} />
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
