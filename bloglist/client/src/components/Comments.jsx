import { CommentForm } from "./CommentForm.jsx";

const Comments = ({ addComment, comments }) => {
  return (
    <>
      <div>
        <h3>comments</h3>
        <ul>
          {comments &&
            comments.map((comment) => {
              return <li key={comment}>{comment}</li>;
            })}
        </ul>
      </div>
      <CommentForm addComment={addComment} />
    </>
  );
};

export default Comments;
