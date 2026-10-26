import { Button, TextField } from "@mui/material";
import blogService from "../services/blogs.js";
import { useNavigate } from "react-router-dom";
import { useBlogsControls } from "../stores/useBlogsStore.js";
import { useUser } from "../stores/userStore.js";
import useNotification from "../stores/useNotification.js";
import useField from "../hooks/useField.js";

export function BlogForm() {
  const [title, titleReset] = useField("text", "normal", "title");
  const [author, authorReset] = useField("text", "normal", "author");
  const [url, urlReset] = useField("text", "normal", "url");
  const navigate = useNavigate();
  const { addBlogToStore } = useBlogsControls();
  const loggedUser = useUser();
  const { setNotification } = useNotification();

  const createBlog = async (createdBlog) => {
    try {
      const response = await blogService.create(createdBlog);
      const newBlog = {
        ...response,
        user: loggedUser,
      };
      addBlogToStore(newBlog);
      setNotification({
        status: "success",
        message: `Added blog ${newBlog.title} by ${newBlog.author}`,
      });
    } catch (error) {
      setNotification({
        status: "error",
        message: error.message,
      });
      console.log(error);
    }
    navigate("/");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });
    titleReset();
    authorReset();
    urlReset();
  };

  return (
    <form className="blog-form" onSubmit={(e) => onSubmit(e)}>
      <h2>create new</h2>
      <TextField {...title} />
      <TextField {...author} />
      <TextField {...url} />
      <Button type={"submit"}>save</Button>
    </form>
  );
}
