// React
import React from 'react';

// Material UI
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid
} from '@mui/material';

const AttendeeCheckbox = ({ attendee, attendeeTitle, attendeeChecked, attendeeType, toggleFunction }) => {
  if (attendee === "sales") {
    return (
      <div className="sales-interviewer" >
        <Typography component="h2" variant="h5"> {attendeeTitle} </Typography>
        <Box sx={{ maxHeight: 170, overflow: 'auto', backgroundColor: 'white', paddingLeft: 2 }}>
          <FormGroup>
            {attendeeChecked.map((checked, index) => (
              (attendeeType[index].tech === false) &&
              <FormControlLabel
                key={attendeeType[index].id}
                control={
                  <Checkbox
                    key={index}
                    checked={checked}
                    onClick={() => toggleFunction(index)}
                  />}
                label={attendeeType[index].name} />
            ))}
          </FormGroup>
        </Box>
      </div >
    )
  }

  if (attendee === "tech") {
    return (
      <div className="tech-interviewer" >
        <Typography component="h2" variant="h5"> {attendeeTitle} </Typography>
        <Box sx={{ maxHeight: 170, overflow: 'auto', backgroundColor: 'white', paddingLeft: 2 }}>
          <FormGroup>
            {attendeeChecked.map((checked, index) => (
              (attendeeType[index].tech === true) &&
              <FormControlLabel
                key={attendeeType[index].id}
                control={
                  <Checkbox
                    key={index}
                    checked={checked}
                    onClick={() => toggleFunction(index)}
                  />}
                label={attendeeType[index].name} />
            ))}
          </FormGroup>
        </Box>
      </div >
    )
  }

  if (attendee === "candidate" ) {
    return (
      <div className="candidate" >
        <Typography component="h2" variant="h5"> {attendeeTitle} </Typography>
        <Box sx={{ maxHeight: 200, overflow: 'auto', backgroundColor: 'white', paddingLeft: 2, borderRadius: 3 }}>
            <FormGroup>
            <Grid container>
              {attendeeChecked.map((checked, index) => (
                <Grid item xs={4} key={attendeeType[index].id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={index}
                        checked={checked}
                        onClick={() => toggleFunction(index)}
                      />}
                    label={attendeeType[index].first_name + " " +
                      attendeeType[index].middle_name + " " +
                      attendeeType[index].last_name}
                  />
                </Grid>
              ))}
              </Grid>
            </FormGroup>
        </Box>
      </div >
    )
  }

  if (attendee === "recruiter") {
    return (
      <div className="recruiter" >
        <Typography component="h2" variant="h5"> {attendeeTitle} </Typography>
        <Box sx={{ maxHeight: 200, overflow: 'auto', backgroundColor: 'white', paddingLeft: 2, borderRadius: 3 }}>
          <FormGroup>
            <Grid container>
              {attendeeChecked.map((checked, index) => (
                <Grid item xs={4} key={attendeeType[index].id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={index}
                        checked={checked}
                        onClick={() => toggleFunction(index)}
                      />}
                    label={attendeeType[index].name}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </Box>
      </div >
    )
  }
}

export default AttendeeCheckbox;
