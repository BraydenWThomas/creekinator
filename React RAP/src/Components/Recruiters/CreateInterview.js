// Components
import NavBar from '../NavBar';

// React
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

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

const CreateInterview = () => {
  
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  const [finalCand, setFinalCand] = useState('');
  const [finalInterviewer, setFinalInterviewer] = useState('');

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    const intID = 1;

    Promise.all([
      fetch("http://localhost:8080/api/ac/" + intID + "/showCandidates", requestOptions),
      fetch("http://localhost:8080/api/ac/" + intID + "/showInterviewers", requestOptions)
    ]).then((responses => {
      console.log(responses)
      responses[0].json()
        .then(data => { setCandidates(data) })
      responses[1].json()
        .then(data => { setInterviewers(data) })
        .then(console.log(candidates))
    })).catch(error => console.log('error', error));
  
  
    // setFinalCand('bob');
    // setFinalInterviewer('bob');
  
  }, []);

  return (
    <div>

      <div className="selector">
      <NavBar />
      <FormControl required sx={{ m: 2, minWidth: 450 }}>
              <InputLabel id="select-candidate-label">Select Candidate</InputLabel>
              <Select
                labelId="select-candidate-label"
                id="candidate-select"
                value={finalCand}
                label="Candidate-select"
                onChange={(event) => setFinalCand(event.target.value)}
                //Need way to add 
              > 
                {
                candidates.map((value,index)=>(
                  <div key={index}>
                    <MenuItem value={value.id}>{value.first_name} {value.last_name}</MenuItem>
                  </div>     
                            ))}
              </Select>
            </FormControl>

            <FormControl required sx={{ m: 2, minWidth: 450 }}>
              <InputLabel id="select-interviewer-label">Select Interviewer</InputLabel>
              <Select
                labelId="select-interviewer-label"
                id="interviewer-select"
                 value={finalInterviewer}
                label="interviewer-select"
                onChange={(event) => setFinalInterviewer(event.target.value)}
                //Need way to add 
              > 
                {
                interviewers.map((value,index)=>(
                  <div key={index}>
                    <MenuItem value={value.id}>{value.name}</MenuItem>
                  </div>     
                            ))}
              </Select>
            </FormControl>
            </div>

    </div>
  )
}

export default CreateInterview;