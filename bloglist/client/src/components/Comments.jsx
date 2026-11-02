import { CommentForm } from "./CommentForm.jsx";

const Comments = ({ comments }) => {
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
      <CommentForm />
    </>
  );
};

export default Comments;
