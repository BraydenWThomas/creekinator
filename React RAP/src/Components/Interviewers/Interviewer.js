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

    // USE THIS FOR LATER
    // const [users, setUsers] = useState([
    //     { username: "John Doe", email: 'johndoe@fdm.com'},
    //     { username: "Jane Doe", email: 'janedoe@fdm.com'},
    //     { username: "Bob Smith", email: 'bobsm@fdm.com'},
    //     { username: "Alice Smith", email: 'alicesmith@fdm.com'},
    //   ])
    //   const [ACs, setACs] = useState([""]);


    const changeDisplay = (value) => {
        setDisplayState(value);
        //console.log(displayState);
    }
    const moveLeft = () => {
        if (pos > 0) {
            setPos(pos - 1)
        }
        else {
            setPos(acList.length - 1)
        }
    }

    const moveRight = () => {
        if (pos < acList.length - 1) {
            setPos(pos + 1)
        }
        else {
            setPos(0)
        }
    }

    const moveDoneLeft = () => {
        if (donepos > 0) {
            setDonePos(donepos - 1)
        }
        else {
            setDonePos(doneACList.length - 1)
        }
    }

    const moveDoneRight = () => {
        if (donepos < doneACList.length - 1) {
            setDonePos(donepos + 1)
        }
        else {
            setDonePos(0)
        }
    }


    return (
        <div className="pageSection" >

            <NavBar />

            <div className='bodySection'>

                <div className="header" style={{ display: "flex" }}>
                    <h1 style={{ flex: 1, margin: '1%', marginTop: '2%' }}>Dashboard</h1>
                    <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
                        <NotificationsIcon fontSize="large" />
                        <Avatar src="/broken-image.jpg" />
                    </div>
                </div>

                <Divider variant='middle' />

                <div>
                    <Box sx={{ m: 2, width: '100%' }}>
                        <Tabs value={displayState} aria-label="interviewer-toolbar">
                            <Tab value="AC_Centre" label="Assessment Centre" onClick={() => changeDisplay("AC_Centre")} />
                            <Tab value="Candidate" label="Interviews & Feedback" onClick={() => changeDisplay("Candidate")} />
                        </Tabs>
                    </Box>
                </div>

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
                                    </div>
                            </div>

                            <AssessmentCentreInfo statustype="upcomeInterviewer" />
                            <div className="scrollArrows">
                                <button onClick={moveLeft} className="leftIcon"><ChevronLeftIcon /></button>
                                <button onClick={moveRight} className="rightIcon"><ChevronRightIcon /></button>
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
                                    </div>
                        </div>
                        <AssessmentCentreInfo statustype="pastInterviewer" />
                        <div className="scrollArrows">
                            <button onClick={moveDoneLeft} className="leftIcon"><ChevronLeftIcon /></button>
                            <button onClick={moveDoneRight} className="rightIcon"><ChevronRightIcon /></button>
                        </div>

                </div>

            </div>

        </div>

    )
}


export default Interviewer;