export function User({ user }) {
  return (
    <div>
      <p>This where we display all the info of users</p>
      <p>{user.name}</p>
      <p>{user.username}</p>
    </div>
  );
}

export default User;
