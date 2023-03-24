// React
import { useState } from "react";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

// Material UI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Badge } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

// Calender
import { Calendar as DateCalendar } from "@mantine/dates";

// import "../Styling/Calendar.scss";

const Calendar = (props) => {
  const handleSelect = (date) => {
    const isSelected = dayjs(date).isSame(props.calendarSelected, "date");
    if (isSelected) {
      return null;
    } else {
      props.setCalendarSelected([dayjs(date)]);
    }
  };

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) > 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? <div className="circle"></div> : undefined}>
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }

  dayjs.extend(customParseFormat);
  return (
    <Container maxWidth="md" className="calendar">
      <Grid2 container spacing={0} justifyContent="center" className="other-wrapper">
        <Grid2 xs={12} sm={12} md={12} lg={8} className="datecalendar-wrapper">
          <DateCalendar
            size="xl"
            minDate={new Date()}
            excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
            getDayProps={(date) => ({
              selected: dayjs(date).isSame(props.calendarSelected, "date"),
              onClick: () => handleSelect(date),
            })}
          />
        </Grid2>
        <Grid2 lg={4} className="times">
          {props.times ? (
            <List
              dense={false}
              subheader={
                <ListSubheader component="div" className="nested-list-subheader" sx={{borderRadius:2, mt:1}}>
                  Scheduled
                </ListSubheader>
              }>
              {props.scheduled.length !== 0 ? (
                props.scheduled.map((schedule) => {
                  return (
                    <ListItem dense={true} sx={{ width: "fit-content" }} key={`${schedule.id}`}>
                      <a href={`recruiter/ac/view-upcoming/${schedule.id}`} target="_blank" rel="noreferrer">
                        <ListItemText
                          primary={`${dayjs(schedule.start_time, "HH:mm:ss").format("LT")} to ${dayjs(
                            schedule.finish_time, "HH:mm:ss").format("LT")}`}
                        />
                      </a>
                    </ListItem>
                  );
                })
              ) : (
                <div className="times__allClear">
                  <p>All Clear! 🎉</p>
                </div>
              )}
            </List>
          ) : null}
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Calendar;
