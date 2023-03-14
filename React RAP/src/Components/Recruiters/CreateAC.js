// Components
import NavBar from '../NavBar';

// React
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

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

// // Brayden

// // Brayden

const CreateAC = () => {
  // AC Details
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState(dayjs().set('hour', 9).set('minute', 0).startOf('minute'));
  const [timeEnd, setTimeEnd] = useState(dayjs().set('hour', 17).set('minute', 0).startOf('minute'));
  const [salesInterviewer1, setSalesInterviewer1] = useState('');
  const [salesInterviewer2, setSalesInterviewer2] = useState('');
  const [techInterviewer1, setTechInterviewer1] = useState('');
  const [techInterviewer2, setTechInterviewer2] = useState('');
  const [salesPack, setSalesPack] = useState('');
  const [techPack, setTechPack] = useState('');

  // Filter
  const [stream, setStream] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  // Time details
  const startDay = dayjs().set('hour', 9).startOf('hour')
  const endDay = dayjs().set('hour', 17).startOf('hour')

  // GET requests
  const [candidates, setCandidates] = useState([]);
  const [packs, setPacks] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  // Fetch all candidates
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    Promise.all([
      fetch("http://localhost:8080/api/candidate", requestOptions),
      fetch("http://localhost:8080/api/pack", requestOptions),
      fetch("http://localhost:8080/api/interviewer", requestOptions)
    ]).then((responses => {
      console.log(responses)
      responses[0].json()
        .then(data => { setCandidates(data) })
      responses[1].json()
        .then(data => { setPacks(data) })
      responses[2].json()
        .then(data => { setInterviewers(data) })
    })).catch(error => console.log('error', error));
  }, []);

  // Handle creating AC
  const handleSubmit = () => {
    setTitle('');
    setDate('');
    setTimeStart(dayjs().set('hour', 9).set('minute', 0).startOf('minute'));
    setTimeEnd(dayjs().set('hour', 17).set('minute', 0).startOf('minute'));
    setSalesInterviewer1('');
    setSalesInterviewer2('');
    setTechInterviewer1('');
    setTechInterviewer2('');
    setCandidates([]);
    setSalesPack('');
    setTechPack('');
    setStream('');
    setFilteredCandidates([]);

    const body =
      JSON.stringify({
        title: title,
        date: date.format('YYYY-MM-DD'),
        start_time: timeStart.format('HH:mm:ss'),
        finish_time: timeEnd.format('HH:mm:ss')
      });

    const requestOptions = {
      method: 'POST',
      body: body,
      redirect: 'follow',
      headers: { 'content-type': 'application/json' }
    };

    // fetch("http://localhost:8080/api/ac", requestOptions)
    fetch("http://localhost:8080/api/ac?interviewers=4,5&recruiters=1&candidates=1,2,3", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

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
                {interviewers.map(interviewer => (
                  (interviewer.tech === false) ?
                    <FormControlLabel
                      key={interviewer.id}
                      control={<Checkbox />}
                      label={interviewer.name} />
                    : <> </>
                ))}
              </FormGroup>
            </Box>
          </div>

          <div className="technical-packs" style={{ float: 'left', width: '50%' }}>
            <h3> Technical Interviewer </h3>
            <Box style={{ maxHeight: 150, overflow: 'auto', width: '100%' }}>
              <FormGroup>
                {interviewers.map(interviewer => (
                  (interviewer.tech === true) ?
                    <FormControlLabel
                      key={interviewer.id}
                      control={<Checkbox />}
                      label={interviewer.name} />
                    : <> </>
                ))}
              </FormGroup>
            </Box>
          </div>
        </div>

        <Divider />

        <div className="candidates" style={{ marginTop: '50pt', padding: '2.5%' }}>
          <div>
            <h2>
              Candidates
              <FormControl sx={{ float: 'right', minWidth: '25%' }}>
                <InputLabel id="stream-select-label"> Stream </InputLabel>
                <Select
                  id="stream-select"
                  label="Stream"
                  required
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}>
                  <MenuItem value={"Stream name"}> Stream name </MenuItem>
                  <MenuItem value={"Stream name"}> Stream name </MenuItem>
                  <MenuItem value={"Stream name"}> Stream name </MenuItem>
                </Select>
              </FormControl>

              <IconButton aria-label="alpha-sort" sx={{ float: 'right' }}>
                <SortByAlphaIcon />
              </IconButton>
            </h2>

            <Box style={{ maxHeight: 150, overflow: 'auto', width: '100%' }}>
              <FormGroup>
                {candidates.map(candidate => (
                  <FormControlLabel
                    key={candidate.id}
                    control={<Checkbox />}
                    label={candidate.first_name + " " + candidate.middle_name + " " + candidate.last_name} />
                ))}
              </FormGroup>
            </Box>

          </div>
        </div>

        <Divider variant="middle" />

        <div className="interview-packs" style={{ marginTop: '-10pt', padding: '2.5%' }}>
          <h2> Interview Pack </h2>

          <div className="sales-packs" style={{ float: 'left', width: '50%' }}>
            <h3> Sales Interview Pack </h3>
            <Box style={{ maxHeight: 150, overflow: 'auto', width: '100%' }}>
              <FormGroup>
                {packs.map(pack => (
                  (pack.pack_type === "Sales") ?
                    <FormControlLabel
                      key={pack.id}
                      control={<Checkbox />}
                      label={pack.pack_name} />
                    : <> </>
                ))}
              </FormGroup>
            </Box>
          </div>

          <div className="technical-packs" style={{ float: 'left', width: '50%' }}>
            <h3> Technical Interview Pack </h3>
            <Box style={{ maxHeight: 150, overflow: 'auto', width: '100%' }}>
              <FormGroup>
                {packs.map(pack => (
                  (pack.pack_type === "Tech") ?
                    <FormControlLabel
                      key={pack.id}
                      control={<Checkbox />}
                      label={pack.pack_name} />
                    : <> </>
                ))}
              </FormGroup>
            </Box>
          </div>

          <Button
            variant="contained"
            sx={{ float: 'right' }}
            onClick={(e) => handleSubmit(e.target.value)}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateAC;
