import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const StartDatePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        label="Start Date"
        value={dayjs(props.date)}
        sx={{ width: 1 / 1, mt: 1 }}
        disabled
      />
    </LocalizationProvider>
  );
};
export default StartDatePicker;
