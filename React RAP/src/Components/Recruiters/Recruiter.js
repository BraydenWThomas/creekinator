// React
import React, { useEffect, useState } from 'react';

// Components
import NavBar from '../NavBar';
import '../Styling/RecruiterStyles.css';
import CandidateSelectBox from '../Candidate/CandidatesSelectBox';
import AssessmentCentreInfo from './AssessmentCentreInfo';

// Material UI
import { Divider, Avatar, Tabs, Tab, Box } from "@mui/material";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Recruiter = () => {
  const [displayState, setDisplayState] = useState("Candidate");
  
  // USE THIS FOR LATER
  // const [users, setUsers] = useState([
  //     { username: "John Doe", email: 'johndoe@fdm.com'},
  //     { username: "Jane Doe", email: 'janedoe@fdm.com'},
  //     { username: "Bob Smith", email: 'bobsm@fdm.com'},
  //     { username: "Alice Smith", email: 'alicesmith@fdm.com'},
  //   ])
  //   const [ACs, setACs] = useState([""]);
  const [candidates, setCandidates] = useState([]);

  // Fetch all candidates
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch("http://localhost:8080/api/candidate", requestOptions)
      .then(response => response.json())
      .then(data => { setCandidates(data) })
      .catch(error => console.log('error', error));
  })

  const changeDisplay = (value) => {
    setDisplayState(value);
    //console.log(displayState);
  }

  return (
    <div className="pageSection">
      <NavBar />

      <div className='Content' style={{ float: 'left', width: '80%', backgroundColor: "#f2f2f2" }}>
        <div className="header" style={{ display: "flex" }}>
          <h1 style={{ flex: 1, margin: '1%' }}> Dashboard </h1>
          <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
            <NotificationsIcon fontSize="large" />
            <Avatar src="/broken-image.jpg" />
          </div>
        </div>

        <Divider variant='middle' />

        <div className='recruiterToolBar'>
          <Box sx={{ m: 2, width: '100%' }}>
            <Tabs value={displayState} aria-label="basic tabs example">
              <Tab value="Candidate" label="Candidates" onClick={() => changeDisplay("Candidate")} />
              <Tab value="AC_Centre" label="Assessment Centre" onClick={() => changeDisplay("AC_Centre")} />
            </Tabs>
          </Box>
        </div>

        {/* <div className='applicantToolBar' style={{clear: "both"}}>
                    <h4 style={{float: "left"}}>Applied</h4>
                    <button className='addCandidate'>+</button>
            </div> */}

        {/* <Router>
            <Routes>
              <Route path='/CandidateInformation' element={<CandidateInformation />} />
              </Routes>

            </Router> */}

        <div className='candidatesInfo' style={{ marginTop: "30px" }}>

          {displayState === "Candidate"
            ?
            <div style={{ clear: "both" }}>
              <div className='applicantToolBar'>
                <h2 style={{ float: "left", paddingBottom: "10px" }}> Applied </h2>
                <div style={{ float: 'right' }}>
                  <button className='candidateSort'> <SortByAlphaIcon /> </button>
                  <select placeholder='filter' id='filterCandidate' style={{ textAlign: 'center', height: "20px", padding: "10px" }}>
                    <option value="default" disabled> filter </option>
                    <option value="Name"> Name </option>
                    <option value="Stream"> Stream </option>
                    <option value="GradYear"> Year of Graduation </option>
                  </select>
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

            :

            <div style={{ clear: "both" }}>
              <div className='assessmentToolBar'>
                <h2 style={{ float: "left", paddingBottom: "10px" }}>Upcoming</h2>
                <div style={{ float: 'right' }}>
                  <button className='candidateSort'><SortByAlphaIcon /></button>
                  <select id='filterCandidate' style={{ textAlign: 'center', height: "20px", padding: "10px" }}>
                    <option value="Name">Name</option>
                    <option value="Stream">Stream</option>
                    <option value="GradYear">Year of Graduation</option>
                  </select>
                  <a href='/ac/create' target="_blank"><button className='candidateAdd'><AddIcon /></button></a>
                </div>
              </div>

              <AssessmentCentreInfo statustype="upcome" />

              <div className="scrollArrows" style={{ float: "right", marginRight: "20px", marginTop: "20px" }}>
                <button className="leftIcon"><ChevronLeftIcon /></button>
                <button className="rightIcon"><ChevronRightIcon /></button>
              </div>

              <div className='assessmentToolBar' style={{ clear: "both" }}>
                <h2 style={{ float: "left", marginBottom: "10px" }}>Past</h2>
                <div style={{ float: 'right' }}>
                  <button className='candidateSort'><SortByAlphaIcon /></button>
                  <select placeholder='filter' id='filterCandidate' style={{ textAlign: 'center', height: "20px", padding: "10px" }}>
                    <option value="default" disabled>filter</option>
                    <option value="Name">Name</option>
                    <option value="Stream">Stream</option>
                    <option value="GradYear">Year of Graduation</option>
                  </select>
                </div>
              </div>

              <AssessmentCentreInfo statustype="past" />

              <div className="scrollArrows" style={{ float: "right", marginRight: "20px", marginTop: "10px" }}>
                <button className="leftIcon"><ChevronLeftIcon /></button>
                <button className="rightIcon"><ChevronRightIcon /></button>
              </div>
            </div>
          }
        </div>
      </div>
    </div >

  )
}


export default Recruiter;