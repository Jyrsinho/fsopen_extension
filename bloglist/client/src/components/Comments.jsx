const Comments = ({ comments }) => {
  return (
    <div>
      <h3>comments</h3>
      <ul>
        {comments &&
          comments.map((comment) => {
            return <li>{comment}</li>;
          })}
      </ul>
    </div>
  );
};

export default Comments;
