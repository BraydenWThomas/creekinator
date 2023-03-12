// Components
import NavBar from '../NavBar';

// React
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

// Material UI
import { Divider,
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
         Checkbox } from "@mui/material";
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
  const [salesInterviewer1, setSalesInterviewer1] = useState('');
  const [salesInterviewer2, setSalesInterviewer2] = useState('');
  const [techInterviewer1, setTechInterviewer1] = useState('');
  const [techInterviewer2, setTechInterviewer2] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [salesPack, setSalesPack] = useState('');
  const [techPack, setTechPack] = useState('');

  // Filter
  const [stream, setStream] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  // Time details
  const startDay = dayjs().set('hour', 9).startOf('hour')
  const endDay = dayjs().set('hour', 17).startOf('hour')

  // Handle creating AC
  const handleSubmit = () => {
    console.log(date)
    console.log(timeStart.format('hh:mm-ss'))
    console.log(timeEnd.format('hh-mm-ss'))
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

    fetch("http://localhost:8080/api/ac", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  // Fetch all candidates
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch("http://localhost:8080/api/candidate", requestOptions)
      .then(response => response.json())
      .then(data => { setCandidates(data) })
      .catch(error => console.log('error', error));
  })

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

          <FormControl sx={{ float: 'left', minWidth: '50%' }}>
            <InputLabel id="sales1-select-label"> Sales Interviewer 1 </InputLabel>
            <Select
              id="sales1-select"
              label="Sales Interview 1"
              sx={{ float: 'left', minWidth: '50%' }}
              required
              value={salesInterviewer1}
              onChange={(e) => setSalesInterviewer1(e.target.value)}>
              <MenuItem value={"John Doe"}> John Doe </MenuItem>
              <MenuItem value={"John Doe"}> John Doe </MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ float: 'left', minWidth: '50%' }}>
            <InputLabel id="tech1-select-label"> Technical Interviewer 1 </InputLabel>
            <Select
              id="tech1-select"
              label="Technical Interview 1"
              required
              value={techInterviewer1}
              onChange={(e) => setTechInterviewer1(e.target.value)}>
              <MenuItem value={"John Doe"}> John Doe </MenuItem>
              <MenuItem value={"John Doe"}> John Doe </MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ float: 'left', minWidth: '50%' }}>
            <InputLabel id="sales2-select-label"> Sales Interviewer 2 </InputLabel>
            <Select
              id="sales2-select"
              label="Sales Interview 2"
              required
              value={salesInterviewer2}
              onChange={(e) => setSalesInterviewer2(e.target.value)}>
              <MenuItem value={"John Doe"}> John Doe </MenuItem>
              <MenuItem value={"John Doe"}> John Doe </MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ float: 'left', minWidth: '50%' }}>
            <InputLabel id="tech2-select-label"> Technical Interviewer 2 </InputLabel>
            <Select
              id="tech2-select"
              label="Technical Interview 2"
              required
              value={techInterviewer2}
              onChange={(e) => setTechInterviewer2(e.target.value)}>
              <MenuItem value={"John Doe"}> John Doe </MenuItem>
              <MenuItem value={"John Doe"}> John Doe </MenuItem>
            </Select>
          </FormControl>
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
                    control={<Checkbox/>} 
                    label={candidate.first_name + " " + candidate.middle_name + " " + candidate.last_name} />
                ))} 
              </FormGroup>

            </Box>

          </div>
        </div>

        <Divider variant="middle" />

        <div className="interview-packs" style={{ margigTop: '-10pt', padding: '2.5%' }}>
          <h2> Interview Pack </h2>
          <FormControl sx={{ float: 'left', minWidth: '50%' }}>
            <InputLabel id="sales-pack-select-label"> Sales Interview Pack </InputLabel>
            <Select
              id="sales-pack-select"
              label="Sales Interview Pack"
              required
              value={salesPack}
              onChange={(e) => setSalesPack(e.target.value)}>
              <MenuItem value={"Sales pack A"}> Sales Pack A </MenuItem>
              <MenuItem value={"Sales pack B"}> Sales Pack B </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ float: 'left', minWidth: '50%' }}>
            <InputLabel id="tech-pack-select-label"> Technical Interview Pack </InputLabel>
            <Select
              id="technical-pack-select"
              label="Technical Interview Pack"
              required
              value={techPack}
              onChange={(e) => setTechPack(e.target.value)}>
              <MenuItem value={"Technical pack A"}> Technical Pack A </MenuItem>
              <MenuItem value={"Technical pack B"}> Technical Pack B </MenuItem>
            </Select>
          </FormControl>

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