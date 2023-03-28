import { TextField } from "@mui/material";
import React from "react";

const TextArea = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <TextField
      id={props.id}
      label={props.label}
      type={props.type}
      value={props.value}
      InputProps={{ readOnly }}
      fullWidth
      onChange={handleChange} />
  )
}

export default TextArea;

