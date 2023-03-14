import { Box, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import '../Styling/RecruiterStyles.css';

const AssessmentCentreInfo = (props) => {


  return (
    <Box
      sx={{
        display: 'flex',
        minWidth: 500,
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: 300
        }
      }}
    >
      <Paper className='assessmentCentreInfo' style={{ clear: "both", borderRadius: 10 }}>


        <div className="streamInfo">
          {props.statustype === "upcome" ?
            <a href="/viewupcomingac/:abc" target={"_blank"}>
              <button className='acDetails'>....</button>
            </a> :
            (props.statustype === "past" ?
              <a href="/viewpastac/:abc" target={"_blank"}>
                <button className='acDetails'>....</button>
              </a> :
              (
                props.statustype === "upcomeInterviewer" ?
                  <a href="/viewac/:abc" target={"_blank"}>
                    <button className='acDetails'>....</button>
                  </a> : <button className='acDetails'>....</button>
              )
            )



          }
          <h2>Stream Name</h2>
          <h4>Stream Name</h4>
        </div>

        <div style={{ marginRight: "20px", marginLeft: "20px", backgroundColor: "white", paddingLeft: "20px" }}>
          <div style={{ width: "30%", float: "left" }}>
            <h4>Interviewers assigned</h4>
            <p>Sales</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Karen</li>
              <li>Joe</li>
            </ul>
            <p>Techincal</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Karen</li>
              <li>Joe</li>
            </ul>
          </div>

          <div style={{ width: "30%", float: "left" }}>
            <h4>Candidate Attending</h4>
            <ul style={{ marginLeft: "20px" }}>
              <li>Kay</li>
              <li>Joan</li>
              <li>Harry</li>
              <li>George</li>
            </ul>
          </div>
          <div style={{ width: "40%", float: "left" }}>
            <h4>Interview Pack</h4>
            <p>Sales</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Pack 1</li>
            </ul>
            <p>Techincal</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Pack 1</li>
            </ul>
          </div>
          <div style={{ display: "flex", clear: "both" }}>
            <h3>NAME</h3>
          </div>

        </div>
      </Paper>
    </Box>
  )
}

export default AssessmentCentreInfo;