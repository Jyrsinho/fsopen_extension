import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {});

  return (
    <div>
      <h2>Users</h2>
      <table>
        <caption>All the users of the software</caption>
        <thead></thead>
      </table>
    </div>
  );
};

export default Users;
