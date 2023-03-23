import { Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";

const TimeRange = (props , { selectTimes }) => {
  const handleChange = (e) => {
    props.onChange(e);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      {props.error ? (
        <TimeField
          error
          helperText={props.helperText}
          label={props.label}
          value={props.time}
          disabled={props.disabled}
          onChange={(newTime) => handleChange(newTime)}
          format="hh:mm A"
          sx={{ width: 1 / 1 }}
        />
        // <TimeField
        //   error
        //   helperText={props.helperText}
        //   label={props.label}
        //   value={props.time}
        //   disabled={props.disabled}
        //   onChange={(newTime) => handleChange(newTime)}
        //   format="hh:mm A"
        //   sx={{ width: 1 / 1 }}>
        //     <Select value={props.time}> 
        //       {selectTimes.map((time, index) => 
        //         <MenuItem key={index} value={time}> {time} </MenuItem>
        //       )}
        //     </Select>
        // </TimeField>
      ) : (
        <TimeField
          label={props.label}
          value={props.time}
          disabled={props.disabled}
          onChange={(newTime) => handleChange(newTime)}
          format="hh:mm A"
          sx={{ width: 1 / 1 }}
        />
          // <FormControl sx={{ float: 'right', minWidth: '25%' }} size="small">
          //   <InputLabel id="time-select-label"> {props.label} </InputLabel>
          //   <Select
          //     id="time-select"
          //     label="Stream"
          //     value={props.time}
          //     onChange={(e) => handleChange(e.target.value)}>
          //     {selectTimes.map((time, index) =>
          //       <MenuItem key={index} value={time}> {time} </MenuItem>
          //     )}
          //   </Select>
          // </FormControl>
      )}
    </LocalizationProvider>
  );
};
export default TimeRange;
