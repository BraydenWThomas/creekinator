// Components
import NavBar from '../NavBar';

// React
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Link, useNavigate } from 'react-router-dom'

// Material UI
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
  Grid
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { Container } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';

const CreateAC = () => {
  // AC Details
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState(dayjs().set('hour', 9).set('minute', 0).startOf('minute'));
  const [timeEnd, setTimeEnd] = useState(dayjs().set('hour', 17).set('minute', 0).startOf('minute'));

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

  // Go back to previous page
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

   // Create MenuItem of selectable time-intervals
   dayjs.extend(customParseFormat);
   var start = timeStart;
   var end = timeEnd;
   var selectTimes = [];
   while (start <= end) {
     selectTimes.push(start.add(30, "minute").format("HH:mm:ss"));
 
     if (selectTimes.at(-1) === end.format("HH:mm:ss")) {
       break
     }
 
     start = dayjs(selectTimes.at(-1), "HH:mm:ss");
   }
   
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

  // Handle creating AC
  const handleSubmit = () => {
    goBack()

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

    // Update
    const body =
      JSON.stringify({
        title: title,
        date: date.format('YYYY-MM-DD'),
        start_time: timeStart.format('HH:mm:ss'),
        finish_time: timeEnd.format('HH:mm:ss'),
        coordinatorId: localStorage.getItem('userId')
      });

    const requestOptions = {
      method: 'POST',
      body: body,
      redirect: 'follow',
      headers: { 'content-type': 'application/json' }
    };

    fetch("http://localhost:8080/api/ac?interviewers=" + interviewerString +
          "&recruiters=1&candidates=" + candidateString, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    // Reset fields
    setTitle('');
    setDate('');
    setTimeStart(dayjs().set('hour', 9).set('minute', 0).startOf('minute'));
    setTimeEnd(dayjs().set('hour', 17).set('minute', 0).startOf('minute'));
    setIsCheckedInterviewer(interviewers.slice().fill(false));
    setIsCheckedCandidates(candidates.slice().fill(false));
  };

  return (
    <div>
      <NavBar />
      <div className="content" style={{ float: 'left', width: '80%' }}>
        <Container component="main">
          <div className="header" style={{ display: "flex" }}>
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>Create Assessment Centre</Typography>
            <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
              <NotificationsIcon fontSize="large" />
              <Avatar src="/broken-image.jpg" />
            </div>
          </div>
          <Box
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              mt: 3,
            }}>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <div className="ac-details">
              <Typography component="h2" variant="h4" mb={2}> Time </Typography>
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
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{width:'100%'}}
                      label="Date"
                      disablePast
                      required
                      format="DD/MM/YYYY"
                      value={date}
                      onChange={(newDate) => setDate(newDate)} />                        
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      sx={{width:'100%'}}
                      label="Start Time"
                      format="hh:mm a"
                      minTime={startDay}
                      maxTime={endDay}
                      value={timeStart}
                      onChange={(newTime) => setTimeStart(newTime)} />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      sx={{width:'100%'}}
                      label="End Time"
                      format="hh:mm a"
                      minTime={startDay}
                      maxTime={endDay}
                      value={timeEnd}
                      onChange={(newTime) => setTimeEnd(newTime)} />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </div>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <div className="Interviewers">
              <Typography component="h2" variant="h4" mb={2}> Interviewers </Typography>
              <Grid container spacing={2}>
                <Grid item xs sm={6}>
                  <div className="sales-packs">
                    <Typography component="h2" variant="h5"> Sales Interviewer </Typography>
                    <Box sx={{ maxHeight: 170, overflow: 'auto', backgroundColor: 'white', paddingLeft:2 }}>
                      <FormGroup>
                        {isCheckedInterviewer.map((checked, index) => (
                          (interviewers[index].tech === false) &&
                            <FormControlLabel
                              key={interviewers[index].id}
                              control={
                                <Checkbox
                                  key={index}
                                  checked={checked}
                                  onClick={() => toggleCheckedInterviewer(index)}
                                />}
                              label={interviewers[index].name}
                            />
                        ))}
                      </FormGroup>
                    </Box>
                  </div>
                </Grid>
                <Grid item xs sm={6}>
                  <div className="technical-packs">
                    <Typography component="h2" variant="h5"> Technical Interviewer </Typography>
                    <Box sx={{ maxHeight: 170, overflow: 'auto', backgroundColor: 'white', paddingLeft:2  }}>
                      <FormGroup>
                        {isCheckedInterviewer.map((checked, index) => (
                          (interviewers[index].tech === true) &&
                            <FormControlLabel
                              key={interviewers[index].id}
                              control={
                                <Checkbox
                                  key={index}
                                  checked={checked}
                                  onClick={() => toggleCheckedInterviewer(index)}
                                />}
                              label={interviewers[index].name}
                            />
                        ))}
                      </FormGroup>
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </div>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <div className="candidates">
              <div style={{ display: 'flex', marginBottom: '2%' }}>
                <Typography component="h2" variant="h4" sx={{ flex: 1 }}> Candidates </Typography>
                <IconButton aria-label="alpha-sort">
                  <SortByAlphaIcon fontSize='medium' />
                </IconButton>
                <FormControl sx={{ float: 'right', minWidth: '25%' }} size="small">
                  <InputLabel id="stream-select-label"> Stream </InputLabel>
                  <Select
                    id="stream-select"
                    label="Stream"
                    required
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}>
                    <MenuItem value="Business Analyst"> Business Analyst </MenuItem>
                    <MenuItem value="Business Intelligence"> Business Intelligence </MenuItem>
                    <MenuItem value="Cloud (AWS)"> Cloud (AWS) </MenuItem>
                    <MenuItem value="Technical Analyst"> Technical Analyst </MenuItem>
                    <MenuItem value="Software Development"> Software Development </MenuItem>
                    <MenuItem value="Testing"> Testing </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Box>
                <FormGroup sx={{ maxHeight: 200, overflow: 'auto', width: '100%'}}>
                  {isCheckedCandidates.map((checked, index) => (
                    <FormControlLabel
                      key={candidates[index].id}
                      control={
                        <Checkbox
                          key={index}
                          checked={checked}
                          onClick={() => toggleCheckedCandidates(index)}
                        />}
                      label={candidates[index].first_name + " " + candidates[index].middle_name + " " + candidates[index].last_name} />
                  ))}
                </FormGroup>
              </Box>
            </div>
            <Grid container spacing={2} sx={{mt: 2}}>
              <Grid item xs sm={12}>
                <Button variant="contained" fullWidth onClick={(e) => handleSubmit(e.target.value)}>
                  Create
                </Button>
              </Grid>
              <Grid item xs sm={12}>
                <Link to={"/recruiter"}>
                  <Button variant="contained" color='secondary' fullWidth> Cancel </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  )
}

export default CreateAC;