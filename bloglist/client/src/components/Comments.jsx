import { CommentForm } from "./CommentForm.jsx";

const Comments = () => {
  const comments = [
    "en pidä tästä",
    "Claude olisi tehnyt paremman",
    "Minusta kirjoittaminen on tyhmää",
  ];

  return (
    <>
      <div>
        <h3>comments</h3>
        <ul>
          {comments &&
            comments.map((comment) => {
              return <li>{comment}</li>;
            })}
        </ul>
      </div>
      <CommentForm />
    </>
  );
};

export default Comments;
