import { Button, TextField } from "@mui/material";
import blogService from "../services/blogs.js";
import { useNavigate } from "react-router-dom";
import { useBlogsControls } from "../stores/useBlogsStore.js";
import { useUser } from "../stores/userStore.js";
import useNotification from "../stores/useNotification.js";
import useField from "../hooks/useField.js";

export function BlogForm() {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
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
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <form className="blog-form" onSubmit={(e) => onSubmit(e)}>
      <h2>create new</h2>
      <TextField
        margin={"normal"}
        label={"title"}
        onChange={(e) => title.onChange(e)}
        value={title.value}
      />
      <TextField
        margin={"normal"}
        label={"author"}
        onChange={(e) => author.onChange(e)}
        value={author.value}
      />
      <TextField
        margin={"normal"}
        label={"url"}
        onChange={(e) => url.onChange(e)}
        value={url.value}
      />
      <Button type={"submit"}>save</Button>
    </form>
  );
}
