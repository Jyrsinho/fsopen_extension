import { useState } from "react";

const useField = (type, margin, label) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [{ type, margin, onChange, value, label }, reset];
};

export default useField;
