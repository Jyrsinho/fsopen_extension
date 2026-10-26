// noinspection JSIgnoredPromiseFromCall

import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import userService from "../services/users.js";

const Users = () => {
  const [users, setUsers] = useState([]);
  console.log("Users -", users);
  users.sort((a, b) => {
    if (a.blogs.length < b.blogs.length) return 1;
    if (a.blogs.length > b.blogs.length) return -1;
    return 0;
  });

  useEffect(() => {
    console.log("running useEffect to fetch users");
    const fetchUsers = async () => {
      try {
        const users = await userService.getAll();
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

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
                  <a href={`localhost5173/users${user.id}`}>{user.name}</a>
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
