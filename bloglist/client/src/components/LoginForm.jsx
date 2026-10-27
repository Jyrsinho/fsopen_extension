import { useState } from "react";
import { Button, TextField } from "@mui/material";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useLoggedUserControls } from "../stores/loggedUserStore.js";
import { useNavigate } from "react-router-dom";
import { useNotificationControls } from "../stores/notificationStore.js";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedUser } = useLoggedUserControls();
  const { setNotification } = useNotificationControls();
  const navigate = useNavigate();

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
