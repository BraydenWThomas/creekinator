// Components
import '../Styling/RecruiterStyles.css';

// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

// Material UI
import { Box, Paper, Button, Menu, MenuItem, IconButton, Icon } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const AssessmentCentreInfo = ({ statustype, ac }) => {
  // Get assigned candidates
  const [candidates, setCandidates] = useState([]);

  // Get assigned interviewers
  const [interviewers, setInterviewers] = useState([]);

  // For Material UI Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Format LocalDate, LocalTime objects from java to dayjs object for javascript
  dayjs.extend(customParseFormat);
  const formatStart = dayjs(ac.start_time, "hh:mm:ss");
  const formatEnd = dayjs(ac.finish_time, "hh:mm:ss");

  const dateFormat =
    dayjs(ac.date).format("dddd, DD MMMM YYYY") + " " +
    formatStart.format("LT") + " - " +
    formatEnd.format("LT")

  const MenuList = () => {
    return (
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <Link to={`/ac/view-upcoming/${ac.id}`}>
            <MenuItem>
              View
            </MenuItem>
          </Link>
          <Link to={`/ac/update/${ac.id}`}>
            <MenuItem>
              Update
            </MenuItem>
          </Link>
          {/* <MenuItem onClick={() => handleDelete(candidate.id)}>
            Delete
          </MenuItem> */}
        </Menu>
      </div>
    )
  }

  // Fetch attendees assigned to ac
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    Promise.all([
      fetch("http://localhost:8080/api/ac/" + ac.id + "/showCandidates", requestOptions),
      fetch("http://localhost:8080/api/ac/" + ac.id + "/showInterviewers", requestOptions)
    ]).then((responses => {
      console.log(responses)
      responses[0].json()
        .then(data => { setCandidates(data) })
      responses[1].json()
        .then(data => { setInterviewers(data) })
    })).catch(error => console.log('error', error));
  }, [])

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
      }} >
      <Paper className='assessmentCentreInfo' style={{ clear: "both", borderRadius: 10 }}>
        <div className="streamInfo">
          {statustype === "upcomingAC" ?
            <MenuList /> :
            (statustype === "pastAC" ?
              <MenuList /> :
              (statustype === "upcomingAC_forInterviewer" ?
                <MenuList /> :
                <button className='acDetails'>....</button>
              )
            )
          }
          <h2> {ac.title} </h2>
          <h4>
            <InfoOutlinedIcon />
            {dateFormat}
          </h4>
        </div>
        <div style={{ marginRight: "20px", marginLeft: "20px", backgroundColor: "white", paddingLeft: "20px" }}>
          <div style={{ width: "30%", float: "left" }}>
            <h4>Interviewers assigned</h4>
            <p>Sales</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Karen</li>
              <li>Joe</li>
            </ul>
            <p>Technical</p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Karen</li>
              <li>Joe</li>
            </ul>
          </div>

          <div style={{ width: "30%", float: "left" }}>
            <h4>Candidate Attending</h4>
            <ul style={{ marginLeft: "20px" }}>
              {candidates.map(candidate => (
                <li key={candidate.id}> 
                  {candidate.first_name + " " + candidate.last_name} 
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", clear: "both" }}>
            <h3> placeholder-ac-coordinator </h3>
          </div>

        </div>
      </Paper>
    </Box>
  )
}

export default AssessmentCentreInfo;