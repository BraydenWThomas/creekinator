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
<<<<<<< HEAD
import { keys } from '@mui/system';
=======
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
>>>>>>> master

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

            <div className='bodySection'>
                <div className="header" style={{ display: "flex" }}>
                    <h1 style={{ flex: 1, margin: '1%' }}>Dashboard</h1>
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
                    <Box
                        sx={{
                            display: 'flex',
                            '& > :not(style)': {
                                m: 1,
                                width: '100%',
                                height: 300
                            }
                        }}
                    >
                        {displayState === "Candidate"
                            ?
                            <div style={{ clear: "both" }}>
                                <div className='applicantToolBar' style={{ display: 'flex' }}>
                                    <Typography component="h2" variant="h4" style={{ flex: 1, margin: 10 }}> Applied </Typography>
                                    <div className='filter'>

                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                            <InputLabel id="filter"></InputLabel>
                                            <Select
                                                labelId="filter"
                                                id="filter"
                                            >
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



                            :

                            <div className='candidatesInfo' style={{ marginTop: "30px" }}>
                                <div className='assessmentToolBar' style={{ display: 'flex' }}>
                                    <Typography component="h2" variant="h4" style={{ flex: 1, margin: 10 }}> Upcoming </Typography>
                                    <div className='filter'>

                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                            <InputLabel id="filter"></InputLabel>
                                            <Select
                                                labelId="filter"
                                                id="filter"
                                            >
                                                <MenuItem value="Name">Name</MenuItem>
                                                <MenuItem value="Stream">Stream</MenuItem>
                                                <MenuItem value="Year of Graduation">Year of Graduation</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <a href='/createcandidate' target="_blank"><button className='candidateAdd'><AddIcon /></button></a>
                                    </div>
                                </div>

<<<<<<< HEAD
                        :

                        <div style={{ clear: "both" }}>
                            <div className='assessmentToolBar'>
                                <h2 style={{ float: "left", paddingBottom: "10px" }}>Upcomming</h2>

                                <div style={{ float: 'right' }}>
                                    <button className='candidateSort'><SortByAlphaIcon /></button>
                                    <select id='filterCandidate' style={{ textAlign: 'center', height: "20px", padding: "10px" }}>
                                        <option value="Name">Name</option>
                                        <option value="Stream">Stream</option>
                                        <option value="GradYear">Year of Graduation</option>
                                    </select>
                                    <a href='/createac' target="_blank"><button className='candidateAdd'><AddIcon /></button></a>
=======
                                <AssessmentCentreInfo statustype="upcomeInterviewer" />
                                <div className="scrollArrows">
                                    <button className="leftIcon"><ChevronLeftIcon /></button>
                                    <button className="rightIcon"><ChevronRightIcon /></button>
>>>>>>> master
                                </div>

                                <div className='assessmentToolBar' style={{ display: 'flex' }}>
                                    <Typography component="h2" variant="h4" style={{ flex: 1, margin: 10 }}> Past </Typography>
                                    <div className='filter'>

                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                            <InputLabel id="filter"></InputLabel>
                                            <Select
                                                labelId="filter"
                                                id="filter"
                                            >
                                                <MenuItem value="Name">Name</MenuItem>
                                                <MenuItem value="Stream">Stream</MenuItem>
                                                <MenuItem value="Year of Graduation">Year of Graduation</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <a href='/createcandidate' target="_blank"><button className='candidateAdd'><AddIcon /></button></a>
                                    </div>
                                </div>
                                <AssessmentCentreInfo statustype="pastInterviewer" />
                                <div className="scrollArrows">
                                    <button className="leftIcon"><ChevronLeftIcon /></button>
                                    <button className="rightIcon"><ChevronRightIcon /></button>
                                </div>

                            </div>
                        }
                    </Box>
                </div>
            </div>
        </div >

    )
}


export default Recruiter;
