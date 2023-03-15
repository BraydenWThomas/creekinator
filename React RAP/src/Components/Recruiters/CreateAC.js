// Components
import NavBar from '../NavBar';

// React
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
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
  Checkbox
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

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

    setTitle('');
    setDate('');
    setTimeStart(dayjs().set('hour', 9).set('minute', 0).startOf('minute'));
    setTimeEnd(dayjs().set('hour', 17).set('minute', 0).startOf('minute'));

    const body =
      JSON.stringify({
        title: title,
        date: date.format('YYYY-MM-DD'),
        start_time: timeStart.format('HH:mm:ss'),
        finish_time: timeEnd.format('HH:mm:ss'),
        // coordinatorId: 
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
  };

  return (
    <div>
      <NavBar />

      <div className="Dashboard" style={{ float: 'left', width: '80%' }}>
        <h1> Create Assessment Centre </h1>

        <Divider variant="middle" />

        <div className="ac-details" style={{ padding: '2.5%' }}>
          <h2> Time </h2>
          <TextField
            id="title-input"
            label="Title"
            type="text"
            autoComplete="current-title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              disablePast
              required
              format="DD/MM/YYYY"
              value={date}
              onChange={(newDate) => setDate(newDate)} />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              format="hh:mm a"
              minTime={startDay}
              maxTime={endDay}
              value={timeStart}
              onChange={(newTime) => setTimeStart(newTime)} />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="End Time"
              format="hh:mm a"
              minTime={startDay}
              maxTime={endDay}
              value={timeEnd}
              onChange={(newTime) => setTimeEnd(newTime)} />
          </LocalizationProvider>
        </div>

        <Divider variant="middle" />

        <div className="Interviewers" style={{ marginTop: '-10pt', padding: '2.5%' }}>
          <h2> Interviewers </h2>
          <div className="sales-packs" style={{ float: 'left', width: '50%' }}>
            <h3> Sales Interviewer </h3>
            <Box style={{ maxHeight: 150, overflow: 'auto', width: '100%' }}>
              <FormGroup>
                {isCheckedInterviewer.map((checked, index) => (
                  (interviewers[index].tech === false) ?
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
                    : <> </>
                ))}
              </FormGroup>
            </Box>
          </div>

          <div className="technical-packs" style={{ float: 'left', width: '50%' }}>
            <h3> Technical Interviewer </h3>
            <Box style={{ maxHeight: 150, overflow: 'auto', width: '100%' }}>
              <FormGroup>
                {isCheckedInterviewer.map((checked, index) => (
                  (interviewers[index].tech === true) ?
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
                    : <> </>
                ))}
              </FormGroup>
            </Box>
          </div>
        </div>

        <Divider />

        <div className="candidates" style={{ marginTop: '50pt', padding: '2.5%' }}>
          <div>
            <h2> Candidates 
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

              <IconButton aria-label="alpha-sort" sx={{ float: 'right' }}>
                <SortByAlphaIcon />
              </IconButton>
            </h2>

            <Box style={{ maxHeight: 150, overflow: 'auto', width: '100%' }}>
              <FormGroup style={{ maxHeight: 150, overflow: 'auto', width: '100%'}}>
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
        </div>
        <Button
          variant="contained"
          sx={{ float: 'right' }}
          onClick={(e) => handleSubmit(e.target.value)}>
          Create
        </Button>
        <Button
          variant="contained"
          sx={{ float: 'right' }}
          onClick={goBack}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default CreateAC;