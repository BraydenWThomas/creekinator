// Components
import NavBar from '../NavBar';

// React
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Link, useParams, useNavigate } from 'react-router-dom';

// Material UI
import {
  Avatar,
  Stack,
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
  Grid,
  Container,
  Typography
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

const CreateTechnicalInterview = () => {
  // AC Details
  const [ac, setAc] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  // Interview details
  const [interviewPacks, setInterviewPacks] = useState([]);
  const [scheduledCands, setScheduledCands] = useState([]);
  const [scheduledPacks, setScheduledPacks] = useState([]);
  const [scheduledTimes, setScheduledTimes] = useState([]);

  // Link to specific AC
  const { acId } = useParams();

  // Get AC + Recruiter info
  const [recruiters, setRecruiters] = useState([]);
  const [acCoordinator, setAcCoordinator] = useState('');

  // Go back to previous page
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  // Fetch AC Details
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    Promise.all([
      fetch("http://localhost:8080/api/ac/" + acId, requestOptions),
      fetch("http://localhost:8080/api/ac/" + acId + "/showCandidates", requestOptions),
      fetch("http://localhost:8080/api/ac/" + acId + "/showInterviewers", requestOptions),
      fetch("http://localhost:8080/api/pack", requestOptions),
      fetch("http://localhost:8080/api/recruiter", requestOptions)
    ]).then((responses => {
      console.log(responses)
      responses[0].json()
        .then(data => { setAc(data) })
      responses[1].json()
        .then(data => { setCandidates(data) })
      responses[2].json()
        .then(data => { setInterviewers(data) })
      responses[3].json()
        .then(data => { setInterviewPacks(data) })
      responses[4].json()
        .then(data => { setRecruiters(data) })
    })).catch(error => console.log('error', error));
  }, [acId]);

  // Get AC Coordinator for AC
  useEffect(() => {
    for (var i = 0; i < recruiters.length; i++) {
      if (recruiters[i].id === ac.coordinatorId) {
        setAcCoordinator(recruiters[i].name);
      };
    };
  }, [recruiters, ac.coordinatorId])

  // Create an empty array of strings the size of number of interviews assigned to ac
  useEffect(() => {
    setScheduledCands(interviewers.slice().fill(""));
    setScheduledPacks(interviewers.slice().fill(""));
    setScheduledTimes(interviewers.slice().fill(""));
  }, [interviewers])

  // Handle scheduling candidates
  const handleScheduleCandidate = (value, index) => {
    scheduledCands[index] = value;
  };

  // Handle scheduling interview packs
  const handleSchedulePack = (value, index) => {
    scheduledPacks[index] = value;
  };

  // Handle scheduling time
  const handleScheduleTime = (value, index) => {
    scheduledTimes[index] = dayjs(value, "hh:mm:ss");
  };

  // Format LocalDate, LocalTime objects from java to dayjs object for javascript
  dayjs.extend(customParseFormat);
  const formatStart = dayjs(ac.start_time, "hh:mm:ss");
  const formatEnd = dayjs(ac.finish_time, "hh:mm:ss");

  const dateFormat =
    dayjs(ac.date).format("dddd, DD MMMM YYYY") + " " +
    formatStart.format("LT") + " - " +
    formatEnd.format("LT")

  // Handle submitting an interview
  const handleSubmit = (index) => {
    const body =
      JSON.stringify({
        interviewTime: scheduledTimes[index].format('HH:mm:ss'),
      });

    const requestOptions = {
      method: 'POST',
      body: body,
      redirect: 'follow',
      headers: { 'content-type': 'application/json' }
    };

    fetch("http://localhost:8080/api/interview?acId=" + ac.id +
      "&interviewId=" + interviewers[index].id + "&candidateId=" + scheduledCands[index] +
      "&packIds=" + scheduledPacks[index], requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  // Handle reseting fields
  const handleResetFields = () => {
    console.log("Working")
    setScheduledCands(interviewers.slice().fill(""));
    setScheduledPacks(interviewers.slice().fill(""));
    setScheduledTimes(interviewers.slice().fill(""));
  }

  return (
    <div>
      <NavBar />

      <div className="Dashboard" style={{ float: 'left', width: '80%' }}>
      <Container component="main">
      <div className="header" style={{ display: "flex" }}>
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>Schedule Upcoming Assessment Centre</Typography>
            <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "3%" }}>
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
          <div style={{ float: 'left', width: '80%' }}>
            <h1> {ac.title} </h1>
            <h2 style={{ marginTop: '5pt' }}>
              {dateFormat}
            </h2>
          </div>

          <div style={{ float: 'left', width: '20%', marginTop: '4%' }}>
            <Stack direction="row" spacing={3}>
              <Avatar> J </Avatar>
              <h4 style={{ marginTop: '3%' }}> AC Coorindator: {acCoordinator} </h4>
            </Stack>
          </div>
        </div>

        <Divider variant="middle" />

        <div className="sales-interviews">
          <h2> Technical Interviews </h2>
          {interviewers.map((interviewer, index) => (
            (interviewer.tech === true &&
              <div>
                <h3 key={index}>
                  {interviewer.name}
                </h3>
                <Grid container spacing={2} columns={32}>
                  <FormControl required sx={{ m: 2, minWidth: 450 }}>
                    <InputLabel id="select-candidate-label"> Select Candidate </InputLabel>
                    <Select
                      labelId="select-candidate-label"
                      id="candidate-select"
                      label="candidate-select"
                      value={scheduledCands[index]}
                      onChange={(e) => handleScheduleCandidate(e.target.value, index)}>
                      {candidates.map(candidate => (
                        <MenuItem key={candidate.id} value={candidate.id}>
                          {candidate.first_name + " " + candidate.last_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl required sx={{ m: 2, minWidth: 350 }}>
                    <InputLabel id="select-interviewer-pack-label"> Select Interview Pack </InputLabel>
                    <Select
                      labelId="select-interviewer-pack-label"
                      id="interviewer-pack-select"
                      label="interviewer-pack-select"
                      value={scheduledPacks[index]}
                      onChange={(e) => handleSchedulePack(e.target.value, index)}>
                      {interviewPacks.map(pack => (
                        (pack.pack_type === "Tech"
                          && // Show sales packs
                          <MenuItem key={pack.id} value={pack.id}>
                            {pack.pack_name}
                          </MenuItem>
                        )
                      ))
                      }
                    </Select>
                  </FormControl>

                  <Grid item xs sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Start Time"
                        format="hh:mm a"
                        minTime={formatStart}
                        value={scheduledTimes[index]}
                        onChange={(newTime) => handleScheduleTime(newTime, index)} />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs sm={4}>
                    <Button
                      variant="outlined"
                      onClick={() => handleSubmit(index)}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )
          ))}
        </div>

        <Grid item xs sm={12}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            onClick={handleResetFields}>
            Reset fields
          </Button>
          <Link to={"/recruiter"}>
            <Button
              variant="contained"
              component="label"
              color="secondary"
              fullWidth
              onClick={goBack}>
              Back
            </Button>
          </Link>
        </Grid>
        </Box>
        </Container>
      </div>
    </div>
  )
}

export default CreateTechnicalInterview;