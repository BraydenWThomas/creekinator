// Components
import '../Styling/RecruiterStyles.css';

// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

// Material UI
import { Box, Paper, Menu, MenuItem, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const AssessmentCentreInfo = ({ statustype, ac }) => {
  // Get assigned candidates
  const [candidates, setCandidates] = useState([]);

  // Get assigned interviewers
  const [interviewers, setInterviewers] = useState([]);

  // Get AC + Recruiter info
  const [recruiters, setRecruiters] = useState([]);
  const [acCoordinator, setAcCoordinator] = useState('');

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

  // Fetch attendees assigned to ac
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    Promise.all([
      fetch("http://localhost:8080/api/ac/" + ac.id + "/showCandidates", requestOptions),
      fetch("http://localhost:8080/api/ac/" + ac.id + "/showInterviewers", requestOptions),
      fetch("http://localhost:8080/api/recruiter", requestOptions),
    ]).then((responses => {
      console.log(responses)
      responses[0].json()
        .then(data => { setCandidates(data) })
      responses[1].json()
        .then(data => { setInterviewers(data) })
      responses[2].json()
        .then(data => { setRecruiters(data) })
    })).catch(error => console.log('error', error));
  }, [ac.id])

  // Get AC Coordinator for AC
  useEffect(() => {
    for (var i = 0; i < recruiters.length; i++) {
      if (recruiters[i].id === ac.coordinatorId) {
        setAcCoordinator(recruiters[i].name);
      };
    };
  }, [recruiters, ac.coordinatorId]);

  // Create menu list of options that changes depending on which user is viewing
  const MenuList = ({ statustype }) => {
    if (statustype === "upcomingAC") {
      return (
        <div className='menu'>
          <div className='select-menu'>
            <IconButton
              id="basic-button"
              onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link to={`ac/view-upcoming/${ac.id}`}>
                <MenuItem>
                  View
                </MenuItem>
              </Link>
              <Link to={`ac/update/${ac.id}`}>
                <MenuItem>
                  Update Details
                </MenuItem>
              </Link>
              <Link to={`ac/update/schedule/sales/${ac.id}`}>
                <MenuItem>
                  Schedule Sales Interviews
                </MenuItem>
              </Link>
              <Link to={`ac/update/schedule/technical/${ac.id}`}>
                <MenuItem>
                  Schedule Technical Interviews
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
      )
    }

    if (statustype === "pastAC") {
      return (
        <div className='menu'>
          <div className='select-menu'>
            <IconButton
              id="basic-button"
              onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}>
              <Link to={`ac/view-past/${ac.id}`}>
                <MenuItem>
                  View
                </MenuItem>
              </Link>
              <MenuItem>
                Delete
              </MenuItem>
            </Menu>
          </div>
        </div>
      )
    }

    if (statustype === "interviewerAC") {
      return (
        <div className='menu'>
          <div className='select-menu'>
          <IconButton
              id="basic-button"
              onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}>
              <Link to={`ac/view/${ac.id}`}>
                <MenuItem>
                  View
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
      )
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: 300
        }
      }} >
      <Paper className='assessmentCentreInfo' style={{ borderRadius: 10}}>
        <div className="streamInfo">
          {statustype === "upcomingAC" ?
            <MenuList statustype={statustype} /> :
            (statustype === "pastAC" ?
              <MenuList statustype={statustype} /> :
              (statustype === "interviewerAC" ?
                <MenuList statustype={statustype} /> :
                <></>
              )
            )
          }
          <Typography component="h1" variant="h5">{ac.title}</Typography>
          <div style={{ display: 'flex' }}>
            <Typography component="h1" variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
              <InfoOutlinedIcon fontSize='medium' style={{ marginRight: '5px' }} />
              {dateFormat}
            </Typography>
          </div>
        </div>
        <div style={{ marginRight: "20px", marginLeft: "20px", backgroundColor: "white", paddingLeft: "20px" }}>
          <div style={{ float: "left", width: "35%" }}>
            <h4> Sales Interviewers </h4>
            <ul style={{ marginLeft: "20px" }}>
              {interviewers.map(interview => (
                (interview.tech === false) ?
                  <li key={interview.id}>
                    {interview.name}
                  </li>
                  : <></>
              ))}
            </ul>
          </div>
          <div style={{ float: "left", width: "35%" }}>
            <h4> Technical Interviewers </h4>
            <ul style={{ marginLeft: "20px" }}>
              {interviewers.map(interview => (
                (interview.tech === true) ?
                  <li key={interview.id}>
                    {interview.name}
                  </li>
                  : <></>
              ))}
            </ul>
          </div>

          <div style={{ width: "30%", float: "left" }}>
            <h4> Candidates Attending </h4>
            <ul style={{ marginLeft: "20px" }}>
              {candidates.map(candidate => (
                <li key={candidate.id}>
                  {candidate.first_name + " " + candidate.last_name}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", clear: "both" }}>
            <h3> {acCoordinator} </h3>
          </div>

        </div>
      </Paper>
    </Box>
  )
}

export default AssessmentCentreInfo;