// noinspection JSIgnoredPromiseFromCall

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useUsers } from "../stores/userStore.js";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useUsers();
  console.log("Users -", users);
  users.sort((a, b) => {
    if (a.blogs.length < b.blogs.length) return 1;
    if (a.blogs.length > b.blogs.length) return -1;
    return 0;
  });

  if (!users.length) return null;

  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>NAME</b>
              </TableCell>
              <TableCell>
                <b>USERNAME</b>
              </TableCell>
              <TableCell>
                <b>BLOGS CREATED</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name} </Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
