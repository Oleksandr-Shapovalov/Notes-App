import { useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const clear = () => setValue("");
  const set = (text) => setValue(text);
  return { bind: { value, onChange }, clear, value, set };
};
