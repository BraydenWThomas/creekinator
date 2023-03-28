import CandidateSelectBox from '../Candidate/CandidatesSelectBox';
import AssessmentCentreInfo from '../Recruiters/AssessmentCentreInfo';
import NavBar from '../NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Box, Divider, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material';

const Interviewer = () => {

  const [displayState, setDisplayState] = useState("AC_Centre");
  const acList = [<AssessmentCentreInfo />, <CandidateSelectBox />, <AssessmentCentreInfo />, <AssessmentCentreInfo />];
  const doneACList = [<AssessmentCentreInfo />, <CandidateSelectBox />, <AssessmentCentreInfo />, <AssessmentCentreInfo />];
  const [pos, setPos] = useState(0);
  const [donepos, setDonePos] = useState(0);

  // AC + Candidate states
  const [candidates, setCandidates] = useState([]);
  const [acs, setAcs] = useState([]);

  // Fetch all candidates + acs
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    Promise.all([
      fetch("http://localhost:8080/api/ac", requestOptions)
    ]).then((responses => {
      console.log(responses)
      responses[0].json()
        .then(data => { setAcs(data) })
    })).catch(error => console.log('error', error));
  }, []);

  const changeDisplay = (value) => {
    setDisplayState(value);
    //console.log(displayState);
  }

  return (
    <div className="pageSection" style={{ display: 'flex' }}>

      <NavBar />

      <div className="content" style={{ float: 'left', width: '100%' }}>
        <div className="header" style={{ display: "flex" }}>
          <Typography
            component="h1"
            variant="h3"
            mt={2}
            ml={2}
            sx={{ flex: 1 }}>
            Dashboard
          </Typography>
          <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "1%" }}>
            <NotificationsIcon fontSize="large" />
            <Avatar src="/broken-image.jpg" />
          </div>
        </div>

        <Divider variant='middle' />

        <div>
          <Box sx={{ m: 2, width: '100%' }}>
            <Tabs value={displayState} aria-label="interviewer-toolbar">
              <Tab value="AC_Centre" label="Assessment Centre" onClick={() => changeDisplay("AC_Centre")} />
            </Tabs>
          </Box>
        </div>

        <div className='acInfo'>
          <div className='assessmentToolBar'>
            <Typography
              component="h2"
              variant="h4"
              style={{ marginLeft: 20 }}>
              Upcoming
            </Typography>
          </div>

          <Box
            sx={{
              maxHeight: '620',
              overflow: 'auto',
              width: 'auto',
              padding: 2
            }}>
            {acs.map(ac => (
              (ac.completed === false
                ? // Show upcoming AC
                <>
                  <div key={ac.id}>
                    <AssessmentCentreInfo statustype="interviewerAC" ac={ac} />
                  </div>
                </>
                : <> </>
              )
            ))}
          </Box>

          <div className='assessmentToolBar'>
          <Typography
              component="h2"
              variant="h4"
              style={{ marginLeft: 20 }}>
              Completed
            </Typography>
          </div>
          <Box
            sx={{
              maxHeight: 400,
              overflow: 'auto',
              width: 'auto',
              padding: 2
            }}>
            {acs.map(ac => (
              (ac.completed === true
                ? // Show completed AC
                <>
                  <div key={ac.id}>
                    <AssessmentCentreInfo statustype="interviewAC" ac={ac} />
                  </div>
                </>
                : <> </>
              )
            ))}
          </Box>
        </div>
      </div>
    </div>
  )
}


export default Interviewer;