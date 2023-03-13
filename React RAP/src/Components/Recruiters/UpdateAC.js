import React, { useState } from 'react';
import NavBar from './NavBar';

import dayjs, { Dayjs } from 'dayjs';
import { Divider, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const UpdateAC = () => {
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

  return (
    <div>
      <NavBar />

      <div className="Dashboard" style={{ float: 'left', width: '80%' }}>
        <h1> Update Assessment Centre </h1>

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
            onChange={(e) => setTitle(e.target.value)} />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              disablePast
              required />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              format="hh:mm a"
              minTime={startDay}
              maxTime={endDay}
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)} />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="End Time"
              format="hh:mm a"
              minTime={startDay}
              maxTime={endDay}
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)} />
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
              <FormGroup sx={{ float: 'left', width: '25%' }}>
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
              </FormGroup>
              <FormGroup sx={{ float: 'left', width: '25%' }}>
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
              </FormGroup>
              <FormGroup sx={{ float: 'left', width: '25%' }}>
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
              </FormGroup>
              <FormGroup sx={{ float: 'left', width: '25%' }}>
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
                <FormControlLabel control={<Checkbox defaultUnChecked />} label="John Doe" />
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
        
          <Button variant="contained" sx={{ float: 'right' }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ float: 'right' }}>
            Save
          </Button> 
        </div>
      </div>
    </div>
  )
}

export default UpdateAC;