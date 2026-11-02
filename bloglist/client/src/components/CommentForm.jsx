import { TextField } from "@mui/material";
import useField from "../hooks/useField.js";

export function CommentForm({ addComment }) {
  const containerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    margin: "1em",
  };

  const buttonStyle = {};

  const [comment, resetComment] = useField("text", "none", "comment");

  return (
    <div style={containerStyle}>
      <TextField {...comment}></TextField>
      <button
        style={buttonStyle}
        onClick={() => {
          addComment(comment.value);
          resetComment();
        }}
      >
        comment
      </button>
    </div>
  );
}
