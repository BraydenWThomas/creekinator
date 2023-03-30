// React
import React from 'react';

// Material UI
import { Box,
         Typography,
         FormGroup,
         FormControlLabel,
         Checkbox } from '@mui/material';

const AttendeeCheckbox = ({ attendee, attendeeTitle, attendeeChecked, attendeeType, toggleFunction }) => {
  if (attendee === "sales") {
    return (
      <div className="sales-packs" >
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
      <div className="sales-packs" >
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

  if (attendee === "candidate") {
    return (
      <div className="sales-packs" >
        <Typography component="h2" variant="h5"> {attendeeTitle} </Typography>
        <Box sx={{ maxHeight: 170, overflow: 'auto', backgroundColor: 'white', paddingLeft: 2 }}>
          <FormGroup>
            {attendeeChecked.map((checked, index) => (
              <FormControlLabel
                key={attendeeType[index].id}
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
            ))}
          </FormGroup>
        </Box>
      </div >
    )
  }
}

export default AttendeeCheckbox;