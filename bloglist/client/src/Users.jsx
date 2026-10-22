import { useEffect, useState } from "react";
import { Paper, Table, TableContainer, TableHead } from "@mui/material";
import userService from "../src/services/users.js";

const Users = () => {
  const [users, setUsers] = useState([]);
  console.log("Users -", users);

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

  return (
    <>
      <div>
        {users.map((user) => (
          <p>{user.name}</p>
        ))}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead></TableHead>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
