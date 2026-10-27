export function User({ user }) {
  console.log("user inside User component", user);

  if (!user) {
    return (
      <div>
        <h3>Ei ole useria</h3>
      </div>
    );
  }

  return (
    <div>
      <p>This where we display all the info of users</p>
      <p>{user.name}</p>
      <p>{user.username}</p>
    </div>
  );
}

export default User;
