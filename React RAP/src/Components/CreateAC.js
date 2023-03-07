import React from 'react';
import NavBar from './NavBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
const CreateAC = () => {
  
  return (
    <div>
      <NavBar />
      <div className="Dashboard" style={{ float: 'left', width: '80%' }}>
        <h1> Create Assessment Centre </h1>
        <Divider variant="middle" />
        <div className="ac-details" style={{paddiong:'3%'}}>
          <TextField
            id="outline-title-input"
            label="Title"
            type="text"
            autoComplete="current-title"
            fullWidth />
          <TextField
            id="outline-date-input"
            label="date"
            autoComplete="current-date" 
            InputProps={{

            }}
            select />
          <TextField
            id="outline-time-start-input"
            label="Time Start"
            select>
              
          </TextField>
          <TextField
            id="outline-time-start-input"
            label="Time Finish"
            select>
              
          </TextField>
        </div>
        <Divider variant="middle" />
        <h2> Interviewers </h2>
        <div className="attendees">
          <TextField
            id="outline-sales1-input"
            label="Sales Interview 1"
            select>
            
          </TextField>
          <TextField
            id="outline-sales1-input"
            label="Sales Interview 2"
            select>
            
          </TextField>
          <TextField
            id="outline-sales1-input"
            label="Technical Interview 1"
            select>
            
          </TextField>
          <TextField
            id="outline-sales1-input"
            label="Technical Interview 2"
            select>
            
          </TextField>
        </div>
      </div>
    </div>
  )
}

export default CreateAC;