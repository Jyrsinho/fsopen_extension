import { useState } from "react";
import { Button, TextField } from "@mui/material";
import loginService from "../services/login";
import blogService from "../services/blogs";
import {
  useLoggedUser,
  useLoggedUserControls,
} from "../stores/loggedUserStore.js";
import { useNavigate } from "react-router-dom";
import { useNotificationControls } from "../stores/notificationStore.js";
import { saveUser } from "../services/persistentUser.js";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loggedUser = useLoggedUser();
  const { setLoggedUser } = useLoggedUserControls();
  const { setNotification } = useNotificationControls();
  const navigate = useNavigate();

  const handleLogin = async (e, credentials) => {
    console.log("handleLogin - credentials", credentials);
    e.preventDefault();
    try {
      const user = await loginService.login(credentials);
      console.log("succesfully logged in to backennd");
      saveUser(user);
      console.log("succesfully added user to localStorage");
      blogService.setToken(user.token);
      console.log("added token to blogSErvice");
      setLoggedUser(user);
      setNotification({
        status: "success",
        message: `${user.name} logged in`,
      });
      navigate("/");
      console.log("navigated");
    } catch (error) {
      console.log(error);
      setNotification({
        status: "error",
        message: "wrong username or password",
      });
    }
  };

  if (loggedUser) {
    return <Button>logout</Button>;
  }

  return (
    <div>
      <h2>Login: </h2>
      <form onSubmit={(e) => handleLogin(e, { username, password })}>
        <TextField
          margin={"normal"}
          autoFocus={true}
          name={"username"}
          label={"username"}
          type={"text"}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></TextField>
        <TextField
          name={"password"}
          label={"password"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></TextField>
        <Button type={"submit"}>login</Button>
      </form>
    </div>
  );
}
