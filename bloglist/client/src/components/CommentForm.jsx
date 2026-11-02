import { TextField } from "@mui/material";
import useField from "../hooks/useField.js";

export function CommentForm() {
  const containerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    margin: "1em",
  };

  const buttonStyle = {};

  const [comment, resetComment] = useField("text", "none", "comment");

  const addComment = () => {
    console.log("lets add a comment");
    console.log(comment.value);
    resetComment();
  };

  return (
    <div style={containerStyle}>
      <TextField {...comment}></TextField>
      <button style={buttonStyle} onClick={addComment}>
        comment
      </button>
    </div>
  );
}
