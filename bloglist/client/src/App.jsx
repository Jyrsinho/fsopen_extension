import { useEffect } from "react";
import blogService from "./services/blogs.js";
import { LoginForm } from "./components/LoginForm.jsx";
import Blogs from "./components/Blogs.jsx";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
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
import useLoggedInUser from "./stores/useLoggedInUser.js";
import Users from "./Users.jsx";
import User from "./components/User.jsx";

const App = () => {
  const { blogs, setBlogsToStore, addBlogToStore, removeBlogFromStore } =
    useBlogs((state) => state);
  const { notification, setNotification, resetNotification } = useNotification(
    (state) => state,
  );
  const { loggedUser, setLoggedUser } = useLoggedInUser();
  const navigate = useNavigate();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((note) => note.id === match.params.id) : null;

  console.log("user Logged in: ", loggedUser);

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
  }, [setLoggedUser]);

  const handleLogout = () => {
    console.log("handleLogOut");
    setLoggedUser(null);
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
      navigate("/");
      await blogService.deleteBlog(blogToRemove.id);
      removeBlogFromStore(blogToRemove.id);
      // setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
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
            <Route path="/users/:id" element={<User />} />
            <Route path="/" element={<Blogs loggedUser={loggedUser} />} />
            <Route path="users/" element={<Users />} />
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
        <Notification
          notification={notification}
          resetNotification={resetNotification}
        />
      </div>
    </Container>
  );
};

export default App;
