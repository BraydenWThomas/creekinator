// Material UI
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";

const TimeRange = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      {props.error ? (
        <FormControl sx={{ float: 'right', minWidth: '25%' }} size="small">
          <InputLabel id="time-select-label"> {props.label} </InputLabel>
          <Select
            id="time-select"
            error
            helperText={props.helperText}
            disabled={props.disabled}
            label={props.label}
            value={props.time}
            onChange={(newTime) => handleChange(newTime)}
            MenuProps={MenuProps}>
            {props.selectTimes.map((time, index) =>
              <MenuItem key={index} value={time}> {time} </MenuItem>
            )}
          </Select>
        </FormControl>
      ) : (
        <FormControl sx={{ float: 'right', minWidth: '25%' }} size="small">
          <InputLabel id="time-select-label"> {props.label} </InputLabel>
          <Select
            id="time-select"
            label={props.label}
            value={props.time}
            onChange={(newTime) => handleChange(newTime)}
            MenuProps={MenuProps}>
            {props.selectTimes.map((time, index) =>
              <MenuItem key={index} value={time}> {time} </MenuItem>
            )}
          </Select>
        </FormControl>
      )}
    </LocalizationProvider>
  );
};
export default TimeRange;
