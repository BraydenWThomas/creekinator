import { InputLabel, MenuItem, Select, TextField, FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

const TextArea = (props) => {
  const handleChange = (e) => {
    props.onChange(e);
  };

  if (props.isTitle) {
    return (
      <FormControl fullWidth>
        <InputLabel label="title-select-label"> {props.label} </InputLabel>
        <Select
          labelId="title-select-label"
          id="title-select"
          label={props.label}
          value={props.textType}
          inputProps={{ readOnly: props.canEdit }}
          fullWidth
          onChange={(e) => handleChange(e.target.value)}>
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
    return (
      <FormControl fullWidth>
        <InputLabel id="applied-stream-select-label"> {props.label} </InputLabel>
        <Select
          labelId="applied-stream-select-label"
          id="applied-stream-select"
          label={props.label}
          value={props.textType}
          inputProps={{ readOnly: props.canEdit }}
          onChange={(e) => handleChange(e.target.value)}
        >
          <MenuItem value="Business Analyst"> Business Analyst </MenuItem>
          <MenuItem value="Business Intelligence"> Business Intelligence </MenuItem>
          <MenuItem value="Cloud (AWS)"> Cloud (AWS) </MenuItem>
          <MenuItem value="Technical Analyst"> Technical Analyst </MenuItem>
          <MenuItem value="Software Development"> Software Development </MenuItem>
          <MenuItem value="Testing"> Testing </MenuItem>
        </Select>
      </FormControl>
    )
  }

  else if (props.isRecruitPhase) {
    return (
      <FormControl fullWidth>
        <InputLabel id="recruitment-phase-select-label"> {props.label} </InputLabel>
        <Select
          labelId="recruitment-phase-select-label"
          id="recruitment-phase-select"
          label={props.label}
          value={props.textType}
          inputProps={{ readOnly: props.canEdit }}
          onChange={(e) => handleChange(e.target.value)}
        >
          <MenuItem value={"applied"}> Applied </MenuItem>
          <MenuItem value={"interviewed"}> Interviewed </MenuItem>
        </Select>
      </FormControl>
    )
  }

  else {
    return (
      (props.error
        ? (props.textType.toString().trim() === ""
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
