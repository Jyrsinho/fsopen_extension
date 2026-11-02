import Blogs from "./Blogs.jsx";
import BlogList from "./BlogList.jsx";

export function User({ user }) {
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
      <ul>
        <BlogList blogs={user.blogs}></BlogList>
      </ul>
    </div>
  );
}

export default User;
