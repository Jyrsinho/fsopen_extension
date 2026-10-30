import { TextField } from "@mui/material";
import useField from "../hooks/useField.js";

export function CommentForm() {
  const [comment, resetComment] = useField("text", "normal", "comment");

  const addComment = () => {
    console.log("lets add a comment");
    console.log(comment.value);
    resetComment();
  };

  return (
    <div>
      <TextField {...comment}></TextField>
      <button onClick={addComment}>comment</button>
    </div>
  );
}
