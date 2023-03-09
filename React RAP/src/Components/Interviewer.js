import CandidateSelectBox from './CandidatesSelectBox';
import AssessmentCentreInfo from './AssessmentCentreInfo';
import './RecruiterStyles.css';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CandidateInformation from './CandidateInformation';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Interviewer = () => {

    const [displayState, setDisplayState] = useState("Candidate");
    const acList = [<AssessmentCentreInfo />,<CandidateSelectBox />,<AssessmentCentreInfo />,<AssessmentCentreInfo />];
    const doneACList = [<AssessmentCentreInfo />,<CandidateSelectBox />,<AssessmentCentreInfo />,<AssessmentCentreInfo />];
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
        if (pos > 0){
            setPos(pos-1)
        }
        else {
            setPos(acList.length-1)
        }
    }

    const moveRight = () => {
        if (pos < acList.length-1){
            setPos(pos+1)
        }
        else {
            setPos(0)
        }
    }

    const moveDoneLeft = () => {
        if (donepos > 0){
            setDonePos(donepos-1)
        }
        else {
            setDonePos(doneACList.length-1)
        }
    }

    const moveDoneRight = () => {
        if (donepos < doneACList.length-1){
            setDonePos(donepos+1)
        }
        else {
            setDonePos(0)
        }
    }


    return (
        <div className="pageSection" >

            <NavBar />

            <div className='bodySection'>

                <div className='bellAndAvatar'>
                    <h1 style={{ paddingLeft: "20px", paddingTop: "20px" }}>Dashboard</h1>
                    
                    <NotificationsIcon/>
                </div>

                <hr />

                <div className='recruiterToolBar'>
                    <div style={{ float: "left" }}>

                        <button value={"AC_Centre"} onClick={() => changeDisplay("AC_Centre")}>Assessment Centres</button>
                        <button value={"Candidate"} onClick={() => changeDisplay("Candidate")}>Interviews</button>
                        <button value={"Candidate"} onClick={() => changeDisplay("Candidate")}>Feedback</button>
                    </div>

                </div>

                <div className='candidatesInfo' style={{ marginTop: "30px" }}>



                    <div>
                        <div className='assessmentToolBar'>
                            <h3>Upcomming</h3>

                            <div style={{ float: 'right' }}>
                                <button className='candidateSort'><SortByAlphaIcon /></button>
                                <select id='filterCandidate' style={{ textAlign: 'center', height: "20px", padding: "10px" }}>

                                    <option value="Name">Name</option>
                                    <option value="Stream">Stream</option>
                                    <option value="GradYear">Year of Graduation</option>

                                </select>

                            </div>
                        </div>
                        
                        <AssessmentCentreInfo statustype="upcomeInterviewer" />
                        <div className="scrollArrows" style={{ float: "right", marginRight: "20px", marginTop: "20px"}}>
                            <button onClick={moveLeft} className="leftIcon"><ChevronLeftIcon /></button>
                            <button onClick={moveRight} className="rightIcon"><ChevronRightIcon /></button>
                        </div>


                        <div className='assessmentToolBar' style={{ clear: "both" }}>
                            <h3 style={{ float: "left" }}>Past</h3>
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
                        <AssessmentCentreInfo statustype="pastInterviewer" />
                        <div className="scrollArrows" style={{float: "right", marginRight: "20px", marginTop: "20px"}}>
                          <button onClick={moveDoneLeft} className="leftIcon"><ChevronLeftIcon /></button>
                            <button onClick={moveDoneRight} className="rightIcon"><ChevronRightIcon /></button>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )
}


export default Interviewer;