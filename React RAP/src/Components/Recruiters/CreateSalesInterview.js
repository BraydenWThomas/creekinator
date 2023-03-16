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
  Grid
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

const CreateSalesInterview = () => {
  // AC Details
  const [ac, setAc] = useState([]);

  // Interview details
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [interviewPacks, setInterviewPacks] = useState([]);
  const [scheduledSalesCands, setScheduledSalesCands] = useState([]);

  const [startTime, setStartTime] = useState(dayjs().set('hour', 9).set('minute', 0).startOf('minute'));
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

  // Handle scheduling a candidate
  useEffect(() => {
    setScheduledSalesCands(candidates.slice().fill(""));
  }, [candidates])

  const handlescheduledSalesCands = (value, index) => {
    scheduledSalesCands[index] = value
    console.log(scheduledSalesCands)
  };

  // Handle scheduling interview packs
  
  
  // Set a starting time to schedule interviews
  useEffect(() => {
    setStartTime(dayjs(ac.start_time, "hh:mm:ss"));
  }, [ac])
  
  // Format LocalDate, LocalTime objects from java to dayjs object for javascript
  dayjs.extend(customParseFormat);
  const formatStart = dayjs(ac.start_time, "hh:mm:ss");
  const formatEnd = dayjs(ac.finish_time, "hh:mm:ss");

  const dateFormat =
    dayjs(ac.date).format("dddd, DD MMMM YYYY") + " " +
    formatStart.format("LT") + " - " +
    formatEnd.format("LT")

  // Handle submitting an interview
  const handleSubmit = (index, interviewer) => {
    // Get scheduled interview packs
    console.log("Working")
    // console.log(interviewer.id)
    const body =
      JSON.stringify({
        interviewTime: startTime.format('HH:mm:ss'),
      });

    const requestOptions = {
      method: 'POST',
      body: body,
      redirect: 'follow',
      headers: { 'content-type': 'application/json' }
    };

    fetch("http://localhost:8080/api/interview?acId=" + ac.id + 
          "&interviewId=" + 2 + "&candidateId=" + scheduledSalesCands[index] + 
          "&packIds=1,2,3,4,5", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  // Generate fillable dropdown form
  const GetNumberOfCandidates = (interviewer) => {
    return (
      <div>
        {scheduledSalesCands.map((scheduledCandId, index) => (
          <Grid key={index} container spacing={2} columns={32}>
            <FormControl required sx={{ m: 2, minWidth: 450 }}>
              <InputLabel id="select-candidate-label"> Select Candidate </InputLabel>
              <Select
                labelId="select-candidate-label"
                id="candidate-select"
                label="candidate-select"
                value={scheduledCandId}
                onChange={(event) => handlescheduledSalesCands(event.target.value, index)}>
                {candidates.map(candidate => (
                  <MenuItem key={candidate.id} value={candidate.first_name + " " + candidate.last_name}>
                    {candidate.first_name + " " + candidate.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {interviewer.tech === false
              ? // Show sales interview packs
              <FormControl required sx={{ m: 2, minWidth: 350 }}>
                <InputLabel id="select-interviewer-pack-label"> Select Interview Pack </InputLabel>
                <Select
                  labelId="select-interviewer-pack-label"
                  id="interviewer-pack-select"
                  label="interviewer-pack-select"
                  >
                  {interviewPacks.map((pack, index) => (
                    (pack.pack_type === "Sales"
                      && // Show sales packs
                        <MenuItem key={pack.id} value={pack.pack_name}>
                          {pack.pack_name}
                        </MenuItem>
                    )
                  ))
                  }
                </Select>
              </FormControl>
              : // Show technical interview packs
              <FormControl required sx={{ m: 2, minWidth: 300 }}>
                <InputLabel id="select-interviewer-pack-label"> Select Interview Pack </InputLabel>
                <Select
                  labelId="select-interviewer-pack-label"
                  id="interviewer-pack-select"
                  label="interviewer-pack-select"
                  >
                  {interviewPacks.map((pack, index) => (
                    (pack.pack_type === "Tech"
                      && // Show tech packs
                      <div key={index}>
                        <MenuItem value={pack.id}>{pack.pack_name}</MenuItem>
                      </div>
                    )
                  ))
                  }
                </Select>
              </FormControl>
            }
            <Grid item xs sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  format="hh:mm a"
                  minTime={formatStart}
                  // maxTime={endDay}
                  value={startTime}
                  onChange={(newTime) => setStartTime(newTime)} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs sm={4}>
              <Button
                variant="outlined"
                onClick={() => handleSubmit(index, interviewer.id)}>
                Submit
              </Button>
            </Grid>
          </Grid>
        ))} 
      </div>
    )
  }

  return (
    <div>
      <NavBar />

      <div className="Dashboard" style={{ float: 'left', width: '80%' }}>
        <h1> Schedule Upcoming Assessment Centre </h1>

        <Divider variant="middle" />

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

          <h2> Sales Interviews </h2>

          {interviewers.map((interviewer, index) => (
            (interviewer.tech === false &&
              <div>
                <h3 key={index}>
                  {interviewer.name}
                </h3>
                <GetNumberOfCandidates interviewer={interviewer}/>
              </div>
            )
          ))}


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
                <GetNumberOfCandidates interviewer={interviewer}/>
              </div>
            )
          ))}

        </div>

        <Grid item xs sm={12}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            // onClick={handleSubmit}
            style={{ marginBottom: "16px" }}>
            Submit All
          </Button>
          <Link to={"/recruiter"}>
            <Button
              variant="contained"
              component="label"
              color="secondary"
              fullWidth
              onClick={goBack}>
              Cancel
            </Button>
          </Link>
        </Grid>
      </div>
    </div>
  )
}

export default CreateSalesInterview;