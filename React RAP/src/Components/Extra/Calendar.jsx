import { Calendar as DateCalendar } from "@mantine/dates";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Badge } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
// import "../Styling/Calendar.scss";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

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

  return (
    <Container maxWidth="md" className="calendar">
      <Grid2 container spacing={0} justifyContent="center" className="other-wrapper">
        <Grid2 xs={12} sm={12} md={12} lg={8} className="datecalendar-wrapper">
          <DateCalendar
            size="xl"
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
                <ListSubheader component="div" className="nested-list-subheader">
                  Scheduled
                </ListSubheader>
              }>
              {props.scheduled.length !== 0 ? (
                props.scheduled.map((schedule) => {
                  return (
                    <ListItem dense={true} sx={{ width: "fit-content" }} key={`${schedule.id}`}>
                      <a href={`recruiter-ac/${schedule.id}`} target="_blank" rel="noreferrer">
                        <ListItemText
                          primary={`${dayjs(schedule.startTime).format("h:mm A")} to ${dayjs(
                            schedule.endTime
                          ).format("h:mm A")}`}
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
