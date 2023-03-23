import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// React
import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Link } from "react-router-dom";

// import "./Styling/CreateAnACPage.scss";
// Components
import AttendeeCheckbox from './AttendeeCheckbox';
import StreamFilter from './StreamFilter';
import StartDatePicker from "../Extra/StartDatePicker";
import TimeRange from "../Extra/TimeRange";
import Calendar from "../Extra/Calendar";
import NavBar from "../NavBar";

// Material UI
import { Divider, Typography, Grid, Button, TextField } from "@mui/material";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { Container } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';

const CreateACPage = () => {
  // URL
  const API_URL = "http://localhost:8080/api/ac";

  // AC Details
  const [title, setTitle] = useState('');
  const [timeError, setTimeError] = useState(false);
  const [startTime, setStartTime] = useState(dayjs().set('hour', 9).set('minute', 0).startOf('minute'));
  const [endTime, setEndTime] = useState(dayjs().set('hour', 17).set('minute', 30).startOf('minute'));
  const [calendarSelected, setCalendarSelected] = useState(dayjs(new Date()));

  // Find existing ACs
  const [scheduledACs, setScheduledACs] = useState([]);

  // GET requests
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  // Checkbox states
  const [isCheckedInterviewer, setIsCheckedInterviewer] = useState([]);
  const [isCheckedCandidates, setIsCheckedCandidates] = useState([]);

  // Fetch all attendees
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    Promise.all([
      fetch("http://localhost:8080/api/candidate", requestOptions),
      fetch("http://localhost:8080/api/interviewer", requestOptions)
    ]).then((responses => {
      responses[0].json()
        .then(data => { setCandidates(data) })
      responses[1].json()
        .then(data => { setInterviewers(data) })
    })).catch(error => console.log('error', error));
  }, []);

  // Handle adding interviewers
  useEffect(() => {
    setIsCheckedInterviewer(interviewers.slice().fill(false));
  }, [interviewers]);

  const toggleCheckedInterviewer = (index) => {
    setIsCheckedInterviewer(isCheckedInterviewer.map((v, i) => (i === index ? !v : v)));
  };

  // Handle adding candidates
  useEffect(() => {
    setIsCheckedCandidates(candidates.slice().fill(false));
  }, [candidates]);

  const toggleCheckedCandidates = (index) => {
    setIsCheckedCandidates(isCheckedCandidates.map((v, i) => (i === index ? !v : v)));
  };

  const refresh = () => {
    if (calendarSelected.length !== 0) {
      fetch(
        API_URL +
        `/by-date?year=${dayjs(calendarSelected).year()}&month=${dayjs(calendarSelected).month() + 1
        }&day=${dayjs(calendarSelected).date()}`
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setScheduledACs(json);
        });
    }
  };

  // Create POST request body
  const createNewACDetails = (title, date, startTime, endTime) => {
    let formattedDate = dayjs(date).format("YYYY-MM-DD");
    let formattedStartTime = dayjs(startTime).format("HH:mm:ss");
    let formattedEndTime = dayjs(endTime).format("HH:mm:ss");

    try {
      // Validate
      for (let i = 0; i < scheduledACs.length; i++) {
        if (
          (dayjs(startTime).isSame(scheduledACs[i].startTime, "minute") &&
            dayjs(endTime).isSame(scheduledACs[i].endTime, "minute")) ||
          (dayjs(startTime).isBefore(scheduledACs[i].startTime, "minute") &&
            dayjs(endTime).isAfter(scheduledACs[i].startTime, "minute")) ||
          (dayjs(startTime).isAfter(scheduledACs[i].startTime, "minute") &&
            dayjs(startTime).isBefore(scheduledACs[i].endTime, "minute"))
        ) {
          throw console.error();
        }
      }

      return {
        title: title,
        date: formattedDate,
        start_time: formattedStartTime,
        finish_time: formattedEndTime,
        coordinatorId: localStorage.getItem("userId")
      };
    } catch (error) {
      setTimeError(true);
      return null;
    }
  };

  const submitNewACForm = async (e) => {
    // Get attending interviewers
    const interviewerIds = [];
    for (var i = 0; i < isCheckedInterviewer.length; i++) {
      if (isCheckedInterviewer[i]) {
        interviewerIds.push(interviewers[i].id);
      }
    }
    const interviewerString = interviewerIds.join(",");

    // Get attending candidates
    const candidateIds = [];
    for (var j = 0; j < isCheckedCandidates.length; j++) {
      if (isCheckedCandidates[j]) {
        candidateIds.push(candidates[j].id);
      }
    }
    const candidateString = candidateIds.join(",");

    // POST body
    const newAC = createNewACDetails(title, calendarSelected, startTime, endTime);
    console.log(newAC)

    // POST request
    try {
      if (newAC !== null) {
        const response = await axios.post(`${API_URL}?interviewers=${interviewerString}&recruiters=1&candidates=${candidateString}`, newAC);
        setTimeError(false);
        refresh();
      }
    } catch (error) {
      console.log(error.response);
    }

    // Reset fields
    setTitle('');
    setStartTime(dayjs().set('hour', 9).set('minute', 0).startOf('minute'));
    setEndTime(dayjs().set('hour', 17).set('minute', 30).startOf('minute'));
    setCalendarSelected(dayjs(new Date()));
    setIsCheckedInterviewer(interviewers.slice().fill(false));
    setIsCheckedCandidates(candidates.slice().fill(false));
  };

  const setTimes = (time) => {
    setStartTime(time);
    setEndTime(dayjs(time).add(2, "hour"));
  };

  // Create MenuItem of selectable time-intervals
  dayjs.extend(customParseFormat);
  var start = startTime;
  var end = endTime;
  var selectTimes = [];
  while (start <= end) {
    selectTimes.push(start.add(30, "minute").format("HH:mm:ss"));

    if (selectTimes.at(-1) === end.format("HH:mm:ss")) {
      break
    }

    start = dayjs(selectTimes.at(-1), "HH:mm:ss");
  }
  console.log(selectTimes);

  useEffect(() => {
    refresh();
  }, [calendarSelected])

  return (
    <div>
      <NavBar />

      <div className="content" style={{ float: 'left', width: '80%' }}>
        <Container component="main">
          <div className="header">
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}> Create Assessment Centre </Typography>
          </div>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title-input"
                label="Title"
                type="text"
                autoComplete="current-title"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={8}>
              <Grid container justify="center">
                <Calendar
                  times={true}
                  scheduled={scheduledACs}
                  calendarSelected={calendarSelected}
                  setCalendarSelected={setCalendarSelected}
                />
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Grid>
                <StartDatePicker date={calendarSelected} />
              </Grid>

              <Grid mt={4}>
                <TimeRange
                  error={timeError}
                  helperText={"Time is currently booked"}
                  label={"Start Time"}
                  time={startTime}
                  onChange={setTimes}
                  selectTimes={selectTimes}
                />
              </Grid>

              <Grid mt={4}>
                <TimeRange
                  error={timeError}
                  label={"End Time"}
                  time={endTime}
                  onChange={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />

          <div className="Interviewers">
            <Typography component="h2" variant="h4" mb={2}> Interviewers </Typography>
            <Grid container spacing={2}>
              <Grid item xs sm={6}>
                <AttendeeCheckbox
                  attendee={"sales"}
                  attendeeTitle={"Sales Interview"}
                  attendeeChecked={isCheckedInterviewer}
                  attendeeType={interviewers}
                  toggleFunction={toggleCheckedInterviewer} />
              </Grid>
              <Grid item xs sm={6}>
                <AttendeeCheckbox
                  attendee={"tech"}
                  attendeeTitle={"Technical Interview"}
                  attendeeChecked={isCheckedInterviewer}
                  attendeeType={interviewers}
                  toggleFunction={toggleCheckedInterviewer} />
              </Grid>
            </Grid>
          </div>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <div className="candidates">
            <StreamFilter header={"Candidate"} />
            <AttendeeCheckbox
              attendee={"candidate"}
              attendeeChecked={isCheckedCandidates}
              attendeeType={candidates}
              toggleFunction={toggleCheckedCandidates} />
          </div>

          <div className="buttons">
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs sm={12}>
                <Button variant="contained" fullWidth onClick={(e) => submitNewACForm(e.target.value)}>
                  Create
                </Button>
              </Grid>
              <Grid item xs sm={12}>
                <Link to={"/recruiter"}>
                  <Button variant="contained" color='secondary' fullWidth> Cancel </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default CreateACPage;