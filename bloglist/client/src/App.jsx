import { useEffect, useState } from "react";
import blogService from "./services/blogs.js";
import { LoginForm } from "./components/LoginForm.jsx";
import Blogs from "./components/Blogs.jsx";
import { Routes, Route, useNavigate, useMatch } from "react-router-dom";
import loginService from "./services/login.js";
import Blog from "./components/Blog.jsx";
import { BlogForm } from "./components/BlogForm.jsx";
import { Notification } from "./components/Notification.jsx";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import useNotification from "./stores/useNotification.js";
import useBlogs from "./stores/useBlogs.js";

const App = () => {
  const blogs = useBlogs((state) => state.blogs);
  const setBlogs = useBlogs((state) => state.setBlogs);
  const [loggedUser, setLoggedUser] = useState(null);
  const notification = useNotification((state) => state.notification);
  const setNotification = useNotification((state) => state.setNotification);
  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((note) => note.id === match.params.id) : null;

  useEffect(() => {
    console.log("running useEffect to fetch blogs");
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setNotification({
          message: "successfully fetched blogs",
          status: "success",
        });
        setBlogs(blogs);
      } catch (error) {
        console.log(error);
        setNotification({
          status: "error",
          message: error.message,
        });
      }
    };
    fetchBlogs();
  }, [setNotification, loggedUser, setBlogs]);

  useEffect(() => {
    console.log("fetching user from local storage...");
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user) {
      console.log("found user from localStorage");
      setLoggedUser(user);
      blogService.setToken(user.token);
    } else {
      console.log("user not found from localStorage");
    }
  }, []);

  const handleLogout = () => {
    console.log("handleLogOut");
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loggedUser");
  };

  const handleLogin = async (e, credentials) => {
    console.log("handleLogin - credentials", credentials);
    e.preventDefault();
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setLoggedUser(user);
      setNotification({
        status: "success",
        message: `${user.name} logged in`,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setNotification({
        status: "error",
        message: "wrong username or password",
      });
    }
  };

  const createBlog = async (createdBlog) => {
    try {
      const response = await blogService.create(createdBlog);
      const newBlog = {
        ...response,
        user: loggedUser,
      };
      const newBlogs = [...blogs, newBlog];
      setBlogs(newBlogs);
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
      setBlogs(newBlogs);
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
      navigate("/");
      await blogService.deleteBlog(blogToRemove.id);
      setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
      setNotification({
        status: "success",
        message: `Removed blog ${blogToRemove.title} by ${blogToRemove.author}`,
      });
    } catch (error) {
      setNotification({
        status: "error",
        message: error.message,
      });
    }
  };

  const resetMessage = () => {
    setNotification(null);
  };

  return (
    <Container>
      <NavBar loggedUser={loggedUser} handleLogout={handleLogout} />
      <div>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blog={blog}
                  loggedUser={loggedUser}
                  addALike={addALike}
                  removeBlog={removeBlog}
                />
              }
            />
            <Route
              path="/"
              element={<Blogs loggedUser={loggedUser} blogs={blogs} />}
            />
            <Route
              path="/login"
              element={
                <LoginForm
                  loggedUser={loggedUser}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path={"/create"}
              element={<BlogForm createBlog={createBlog} />}
            />
            <Route path={"*"} element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <div>
        <Notification notification={notification} resetMessage={resetMessage} />
      </div>
    </Container>
  );
};

export default App;
