import BlogList from "./BlogList.jsx";

const Blogs = ({ blogs }) => {
  return (
    <div>
      <ul>
        <h3>blogs</h3>
        <BlogList blogs={blogs} />
      </ul>
    </div>
  );
};
export default Blogs;
