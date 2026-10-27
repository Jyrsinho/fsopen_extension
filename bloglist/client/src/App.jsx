import { useEffect } from "react";
import blogService from "./services/blogs.js";
import { LoginForm } from "./components/LoginForm.jsx";
import Blogs from "./components/Blogs.jsx";
import { Route, Routes, useMatch } from "react-router-dom";
import Blog from "./components/Blog.jsx";
import { BlogForm } from "./components/BlogForm.jsx";
import { Notification } from "./components/Notification.jsx";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import { useBlogs, useBlogsControls } from "./stores/blogsStore.js";
import Users from "./components/Users.jsx";
import User from "./components/User.jsx";
import { useLoggedUserControls } from "./stores/loggedUserStore.js";
import { useUserControls, useUsers } from "./stores/userStore.js";
import { useNotificationControls } from "./stores/notificationStore.js";

const App = () => {
  const blogs = useBlogs();
  const users = useUsers();
  const { initializeUsers } = useUserControls();
  const { initializeBlogs } = useBlogsControls();
  const { setLoggedUser } = useLoggedUserControls();
  const { setNotification } = useNotificationControls();

  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user) {
      setLoggedUser(user);
      blogService.setToken(user.token);
    } else {
      console.log("did not find logged user from local storage");
    }
  }, [setLoggedUser]);

  useEffect(() => {
    const initUsers = async () => {
      try {
        await initializeUsers();
        console.log("initialized users");
      } catch (err) {
        console.log(err);
        setNotification(err.message);
      }
    };
    initUsers();
  }, [initializeUsers, setNotification]);

  useEffect(() => {
    const initBlogs = async () => {
      try {
        await initializeBlogs();
        console.log("initialized blogs");
      } catch (error) {
        setNotification(error.message);
        console.error(error);
      }
    };
    initBlogs();
  }, [initializeBlogs, setNotification]);

  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <Container>
      <NavBar handleLogout={handleLogout} />
      <div>
        <ErrorBoundary>
          <Routes>
            <Route path="/blogs/:id" element={<Blog blog={blog} />} />
            <Route path="/users/:id" element={<User user={user} />} />
            <Route path="/" element={<Blogs />} />
            <Route path="users/" element={<Users />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path={"/create"} element={<BlogForm />} />
            <Route path={"*"} element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <div>
        <Notification />
      </div>
    </Container>
  );
};

export default App;
