import CandidateSelectBox from '../Candidate/CandidatesSelectBox';
import AssessmentCentreInfo from './AssessmentCentreInfo';
// import '../Styling/RecruiterStyles.css';
import NavBar from '../NavBar';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const Recruiter = () => {
  const [displayState, setDisplayState] = useState("Candidate");

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
      fetch("http://localhost:8080/api/candidate", requestOptions),
      fetch("http://localhost:8080/api/ac", requestOptions)
    ]).then((responses => {
      console.log(responses)
      responses[0].json()
        .then(data => { setCandidates(data) })
      responses[1].json()
        .then(data => { setAcs(data) })
    })).catch(error => console.log('error', error));
  }, [])

  const changeDisplay = (value) => {
    setDisplayState(value);
  }

  return (
    <div className="pageSection">

      <NavBar />

      <div className='bodySection'>
        <div className="header" style={{ display: "flex" }}>
          <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>Dashboard</Typography>
          <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
            <NotificationsIcon fontSize="large" />
            <Avatar src="/broken-image.jpg" />
          </div>
        </div>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <div className='recruiterToolBar'>
          <Box sx={{ m: 2, width: '100%' }}>
            <Tabs value={displayState} aria-label="basic tabs example">
              <Tab value="Candidate" label="Candidates" onClick={() => changeDisplay("Candidate")} />
              <Tab value="AC_Centre" label="Assessment Centre" onClick={() => changeDisplay("AC_Centre")} />
            </Tabs>
          </Box>
        </div>

        <div className='candidatesInfo' style={{ marginTop: "30px" }}>
          <Box
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: '100%',
                height: 300
              }
            }} >
            {displayState === "Candidate"
              ? // Display candidate tab
              <div style={{ clear: "both" }}>
                <div className='applicantToolBar' style={{ display: 'flex' }}>
                  <Typography component="h2" variant="h4" style={{ flex: 1, margin: 10 }}> Applied </Typography>
                  <div className='filter'>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="filter"> Filter </InputLabel>
                      <Select labelId="filter" id="filter" label="Filter" value={""}>
                        <MenuItem value="Name">Name</MenuItem>
                        <MenuItem value="Stream">Stream</MenuItem>
                        <MenuItem value="Year of Graduation">Year of Graduation</MenuItem>
                      </Select>
                    </FormControl>
                    <a href="/candidate/create" target="_blank">
                      <button
                        className='candidateAdd'>
                        <AddIcon />
                      </button>
                    </a>
                  </div>
                </div >
                {candidates.map(candidate => (
                  <div key={candidate.id}>
                    <CandidateSelectBox candidate={candidate} />
                  </div>
                ))}
              </div>
              : // Display AC tab
              <div className='acInfo' style={{ marginTop: "30px" }}>
                <div className='assessmentToolBar' style={{ display: 'flex' }}>
                  <Typography
                    component="h2"
                    variant="h4"
                    style={{ flex: 1, margin: 10 }}>
                    Upcoming
                  </Typography>
                  <div className='filter'>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="filter"> Filter </InputLabel>
                      <Select labelId="filter" id="filter" label="Filter" value={""}>
                        <MenuItem value="Name">Name</MenuItem>
                        <MenuItem value="Stream">Stream</MenuItem>
                        <MenuItem value="Year of Graduation">Year of Graduation</MenuItem>
                      </Select>
                    </FormControl>
                    <a href="/ac/create" target="_blank">
                      <button className='candidateAdd'> <AddIcon /> </button>
                    </a>
                  </div>
                </div>

                {acs.map(ac => (
                  (ac.completed === false
                    ? // Show incompleted AC
                    <>
                      <div key={ac.id}>
                        <AssessmentCentreInfo statustype="upcomingAC" ac={ac} />
                      </div>
                      <div className="scrollArrows">
                        <button className="leftIcon"><ChevronLeftIcon /></button>
                        <button className="rightIcon"><ChevronRightIcon /></button>
                      </div>
                    </>
                    : <> </>
                  )
                ))}

                <div className='assessmentToolBar' style={{ display: 'flex' }}>
                  <Typography
                    component="h2"
                    variant="h4"
                    style={{ flex: 1, margin: 10 }}>
                    Past
                  </Typography>
                  <div className='filter'>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="filter"> Filter </InputLabel>
                      <Select labelId="filter" id="filter" label="Filter" value={""}>
                        <MenuItem value="Name">Name</MenuItem>
                        <MenuItem value="Stream">Stream</MenuItem>
                        <MenuItem value="Year of Graduation">Year of Graduation</MenuItem>
                      </Select>
                    </FormControl>
                    <a href="/ac/create" target="_blank">
                      <button className='candidateAdd'> <AddIcon /> </button>
                    </a>
                  </div>
                </div>
                {acs.map(ac => (
                  (ac.completed === true
                    ? // Show completed AC
                    <>
                      <div key={ac.id}>
                        <AssessmentCentreInfo statustype="pastAC" ac={ac} />
                      </div>
    
                      {/* <div className="scrollArrows">
                        <button className="leftIcon"><ChevronLeftIcon /></button>
                        <button className="rightIcon"><ChevronRightIcon /></button>
                      </div> */}
                    </>
                    : <></>
                  )
                ))}
              </div>
            }
          </Box>
        </div>
      </div>
    </div >

  )
}

export default Recruiter;
