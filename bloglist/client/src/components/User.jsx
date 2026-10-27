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
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ol>
        <li>eka blogi</li>
        <li>toka blogi</li>
      </ol>
    </div>
  );
}

export default User;
