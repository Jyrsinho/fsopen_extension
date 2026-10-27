import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useUser } from "../stores/userStore.js";

const style = {
  margin: "1em",
  "&:hover": {
    bgcolor: "rgba(0,255,255,0.5)",
  },
};

const NavBar = ({ handleLogout }) => {
  const loggedUser = useUser();

  return (
    <AppBar position="static">
      <Toolbar>
        {loggedUser ? (
          <Button
            color="inherit"
            onClick={handleLogout}
            component={Link}
            to={"/"}
            sx={style}
          >
            logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to={"/login"} sx={style}>
            login
          </Button>
        )}
        <Button color="inherit" component={Link} to="/" sx={style}>
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/create" sx={style}>
          new blog
        </Button>
        <Button color="inherit" component={Link} to="/users" sx={style}>
          users
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
