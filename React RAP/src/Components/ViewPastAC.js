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

const ViewPastAC = () => {
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
        <h1> Upcoming Assessment Centre </h1>
        <Divider variant="middle" />
        <div className="ac-details" style={{ padding: '2.5%' }}>
          <h1> placeholder-ac-title </h1>
          <h2> placeholder-date </h2>
        </div>

        <Divider variant="middle" />



        <Button variant="contained" sx={{ float: 'right' }}>
          Back
        </Button>

        <Button variant="contained" sx={{ float: 'right' }}>
          Update-show-up-for-ac-coordinator
        </Button>
      </div>
    </div>
  )
}

export default ViewPastAC;