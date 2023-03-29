import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { FormControl } from "react-bootstrap";

const TextArea = (props) => {
  const handleChange = (e) => {
    props.onChange(e);
  };

  if (props.isTitle) {
    return (
      <FormControl fullWidth>
      <InputLabel label="title-select-label"> Title </InputLabel>
      <Select
        labelId="title-select-label"
        id="title-select"
        label={props.label}
        value={props.textType}
        inputProps={{ readOnly: props.canEdit }}
        fullWidth
        onChange={handleChange}>
          <MenuItem value={"Mr"}> Mr </MenuItem>
          <MenuItem value={"Ms"}> Ms </MenuItem>
          <MenuItem value={"Miss"}> Miss </MenuItem>
          <MenuItem value={"Mrs"}> Mrs </MenuItem>
          <MenuItem value={"Dr"}> Dr </MenuItem>
      </Select>
    </FormControl>
    )
  }

  else if (props.isDob) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="DD/MM/YYYY"
          label={props.label}
          value={props.textType}
          readOnly={props.canEdit}
          fullWidth
          onChange={(newDob) => handleChange(newDob)}
        />
      </LocalizationProvider>
    )
  }

  else if (props.isStream) {

  }

  else if (props.isRecruitPhase) {

  }

  else {
    return (
      (props.error
        ? (props.textType.trim() === ""
          ? <TextField
            id="outlined-text-field"
            type="text"
            error
            helperText={props.helperText}
            label={props.label}
            value={props.textType}
            InputProps={{ readOnly: props.canEdit }}
            fullWidth
            onChange={(e) => handleChange(e.target.value)}
          />
          : <TextField
            id="outlined-text-field"
            type="text"
            label={props.label}
            value={props.textType}
            InputProps={{ readOnly: props.canEdit }}
            fullWidth
            onChange={(e) => handleChange(e.target.value)}
          />
        )
        : <TextField
          id="outlined-text-field"
          type="text"
          label={props.label}
          value={props.textType}
          InputProps={{ readOnly: props.canEdit }}
          fullWidth
          onChange={(e) => handleChange(e.target.value)}
        />
      )
    )
  };
};

export default TextArea;
