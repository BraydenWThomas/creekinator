// React
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

// Components
import NavBar from '../NavBar';
import StartDatePicker from "./Recruitinator/StartDatePicker";
import TimeRange from "./Recruitinator/TimeRange";
// import Calendar from "./Recruitinator/Calendar";

// css
// import "../styles/pages/CreateAnACPage.scss";

// Material UI
// import Grid from "@mui/material/Unstable_Grid/Grid";
// import Container from "@mui/material/Container";
import {
  Divider,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,
  IconButton,
  Box,
  FormGroup,
  Checkbox,
  Typography,
  Avatar,
  Grid,
  Container
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
// import { Container } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Navbar } from 'react-bootstrap';

const CreateAC = () => {
  const API_URL = "http://localhost:8080/api/assessment-centre";

  // AC Details
  const [timeError, setTimeError] = useState(false);
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(2, "hour"));
  const [scheduledACs, setScheduledACs] = useState([]);
  const [calendarSelected, setCalendarSelected] = useState(dayjs(new Date()));

  // Filter
  const [stream, setStream] = useState('');

  // Time details
  const startDay = dayjs().set('hour', 9).startOf('hour')
  const endDay = dayjs().set('hour', 17).startOf('hour')

  // GET requests
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  // Checkbox states
  const [isCheckedInterviewer, setIsCheckedInterviewer] = useState([]);
  const [isCheckedCandidates, setIsCheckedCandidates] = useState([]);

  // Fetch all candidates
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    Promise.all([
      fetch("http://localhost:8080/api/candidate", requestOptions),
      fetch("http://localhost:8080/api/interviewer", requestOptions)
    ]).then((responses => {
      console.log(responses)
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

  // // Calender Input Validation
  // const refresh = () => {
  //   if (calendarSelected.length !== 0) {
  //     fetch(
  //       API_URL +
  //       `/get-ac-by-date?year=${dayjs(calendarSelected).year()}&month=${dayjs(calendarSelected).month() + 1
  //       }&day=${dayjs(calendarSelected).date()}`
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((json) => {
  //         setScheduledACs(json);
  //       });
  //   }
  // };

  const createNewAC = (date, startTime, endTime) => {
    let formattedDate = dayjs(date).format("YYYY-MM-DDT");
    let formattedStartTime = dayjs(startTime).format("HH:mm:ssZ[Z]");
    let formattedEndTime = dayjs(endTime).format("HH:mm:ssZ[Z]");
    let formattedStartDate = dayjs(formattedDate + formattedStartTime, "YYYY-MM-DDTHH:mm:ssZ[Z]");
    let formattedEndDate = dayjs(formattedDate + formattedEndTime, "YYYY-MM-DDTHH:mm:ssZ[Z]");

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
        endTime: formattedEndDate,
        startTime: formattedStartDate,
      };
    } catch (error) {
      setTimeError(true);
      return null;
    }
  };

  // const submitNewACForm = async (e) => {
  //   const newAC = createNewAC(calendarSelected, startTime, endTime);
  //   try {
  //     if (newAC !== null) {
  //       const response = await axios.post(`${API_URL}/${localStorage.getItem("userID")}`, newAC);
  //       setTimeError(false);
  //       refresh();
  //     }
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  const setTimes = (time) => {
    setStartTime(time);
    setEndTime(dayjs(time).add(2, "hour"));
  };

  // useEffect(() => {
  //   refresh();
  // }, [calendarSelected]);

  return (
    <div className="CreateAnACPage">
      <Navbar />

      {/* <Container maxWidth="xl"> */}
        <Grid container spacing={2} sx={{ mt: 3 }} className="create-an-ac-page-wrapper">
          <Grid container md={12} lg className="availability-wrapper">
            <Grid xs={12}>
              <Typography variant="h4" fontWeight={300} fontSize={24}>
                Availability
              </Typography>
            </Grid>
            {/* <Grid xs={12} className="calendar-wrapper">
              <Calendar
                times={true}
                scheduled={scheduledACs}
                calendarSelected={calendarSelected}
                setCalendarSelected={setCalendarSelected}
              />
            </Grid> */}
          </Grid>
          <Grid container sm={12} lg={6} className="container">
            <Grid xs={12}>
              <Typography variant="h4" fontWeight={300} fontSize={30}>
                Create New Assessment Centre
              </Typography>
            </Grid>
            <Grid xs={12}>
              <StartDatePicker date={calendarSelected} />
            </Grid>
            <Grid xs={6}>
              <TimeRange
                error={timeError}
                helperText={"Time is currently booked"}
                label={"Start Time"}
                hourOffset={0}
                time={startTime}
                onChange={setTimes}
              />
            </Grid>
            <Grid xs={6}>
              <TimeRange
                error={timeError}
                label={"End Time"}
                hourOffset={2}
                time={endTime}
                disabled={true}
              />
            </Grid>
            <Grid xs={12}>

            </Grid>
          </Grid>
        </Grid>
      {/* </Container> */}
    </div>
  );

}

export default CreateAC;


