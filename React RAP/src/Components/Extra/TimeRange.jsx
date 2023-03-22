import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";

const TimeRange = (props) => {
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
      ) : (
        <TimeField
          label={props.label}
          value={props.time}
          disabled={props.disabled}
          onChange={(newTime) => handleChange(newTime)}
          format="hh:mm A"
          sx={{ width: 1 / 1 }}
        />
      )}
    </LocalizationProvider>
  );
};
export default TimeRange;
