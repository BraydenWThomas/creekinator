// React + css
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// import '../Styling/RecruiterStyles.css';

// Webpage Components
import NavBar from '../NavBar';
import CandidateSelectBox from '../Candidate/CandidatesSelectBox';
import AssessmentCentreInfo from './AssessmentCentreInfo';

// Material UI
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import CreateCandidate from '../Candidate/CreateCandidate';
import CandidateInformationRec from '../Candidate/CandidateInformationRec';

const Recruiter = () => {
  // Change tab options
 
  const [displayState, setDisplayState] = useState("Candidate");

  const [createModalOpen, setCreateModalOpen] = useState(false);
  
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

  // Change display to candidates or to assessment centres
  const changeDisplay = (value) => {
    setDisplayState(value);
  }

  return (
    <div style={{ display: 'flex' }}>

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
          <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
            <NotificationsIcon fontSize="large" />
            <Avatar src="/broken-image.jpg" />
          </div>
        </div>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <div className='recruiterToolBar'>
          <Box>
            <Tabs value={displayState} aria-label="display-tabs">
              <Tab
                value="Candidate"
                label="Candidates"
                onClick={() => changeDisplay("Candidate")} />
              <Tab
                value="AC_Centre"
                label="Assessment Centre"
                onClick={() => changeDisplay("AC_Centre")} />
            </Tabs>
          </Box>
        </div>

        <div className='candidatesInfo'>
          <Box
            sx={{
              maxHeight: 1000,
              overflow: 'auto',
              width: 'auto',
              padding: 2
            }}>
            {displayState === "Candidate"
              ? // Display candidate tab
              <div style={{ clear: "both" }}>
                <div className='applicantToolBar' style={{ display: 'flex', marginLeft: 20 }}>
                  <Typography
                    component="h2"
                    variant="h4"
                    style={{ flex: 1 }}>
                    Applied
                  </Typography>
                  <div className='add-c' style={{ marginRight: 20 }}>
                    {/* <Link to={"candidate/create"}> */}
                    <IconButton onClick={() => setCreateModalOpen(true)}  >
                      <AddIcon fontSize='large' />
                      {/* </Link> */}</IconButton>
                  </div>
                </div >
                {candidates.map(candidate => (
                  <div key={candidate.id}>
                    <CandidateSelectBox candidate={candidate} />
                  </div>
                ))}
              </div>
              : // Display AC tab
              <div className='assessmentCentreInfo'>
                <div className='assessmentToolBar' style={{ display: 'flex', marginLeft: 20 }}>
                  <Typography
                    component="h2"
                    variant="h4"
                    style={{ flex: 1 }}>
                    Upcoming
                  </Typography>
                  <div className='add-ac' style={{ marginRight: 20 }}>
                    <Link to={"ac/create"}>
                      <AddIcon fontSize='large' />
                    </Link>
                  </div>
                </div >
                <Box
                  sx={{
                    maxHeight: 620,
                    overflow: 'auto',
                    width: 'auto',
                    padding: 2
                  }}>
                  {acs.map(ac => (
                    (ac.completed === false
                      ? // Show incompleted AC
                      <>
                        <div key={ac.id}>
                          <AssessmentCentreInfo statustype="upcomingAC" ac={ac} />
                        </div>
                      </>
                      : <> </>
                    )
                  ))}
                </Box>
                <div className='assessmentToolBar' style={{ display: 'flex' }}>
                  <Typography
                    component="h2"
                    variant="h4"
                    style={{ flex: 1, margin: 10 }}>
                    Past
                  </Typography>
                </div>
                <Box
                  sx={{
                    maxHeight: 300,
                    overflow: 'auto',
                    width: 'auto',
                    padding: 2
                  }}>
                  {acs.map(ac => (
                    (ac.completed === true
                      ? // Show completed AC
                      <>
                        <div key={ac.id}>
                          <AssessmentCentreInfo statustype="pastAC" ac={ac} />
                        </div>
                      </>
                      : <></>
                    )
                  ))}
                </Box>

              </div>
            }
          </Box>
          <CreateCandidate
            createModalOpen={createModalOpen}
            setCreateModalOpen={setCreateModalOpen}
          />
        </div>
      </div>
    </div >

  )
}

export default Recruiter;
