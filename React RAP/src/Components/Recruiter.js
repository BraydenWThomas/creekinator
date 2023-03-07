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

const Recruiter = () => {

    const [displayState, setDisplayState] = useState("Candidate");
    const [inputList, setInputList] = useState([<CandidateSelectBox />]);
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


    const addCandidateBox = () => {
        setInputList(inputList.concat(<CandidateSelectBox />));
    }
    return (
        <div className="pageSection">

            <NavBar />

            <div className='bodySection'>

                <div className='bellAndAvatar'>
                    <h1 style={{ paddingLeft: "20px", paddingTop: "20px" }}>Dashboard</h1>
                    <p>BELL ICON</p>
                    <p>AVATAR</p>
                </div>

                <hr />

                <div className='recruiterToolBar'>
                    <div style={{ float: "left" }}>
                        <button value={"Candidate"} onClick={() => changeDisplay("Candidate")}>Applications</button>
                        <button value={"AC_Centre"} onClick={() => changeDisplay("AC_Centre")}>Assessment Centres</button>
                    </div>

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
                                <h4 style={{ float: "left" }}>Applied</h4>

                                <div style={{ float: 'right' }}>
                                    <button className='candidateSort'><SortByAlphaIcon /></button>
                                    <select placeholder='filter' id='filterCandidate' style={{ textAlign: 'center', height: "20px", padding: "10px" }}>
                                        <option value="default" disabled>filter</option>
                                        <option value="Name">Name</option>
                                        <option value="Stream">Stream</option>
                                        <option value="GradYear">Year of Graduation</option>
                                    </select>
                                    <button className='candidateAdd' onClick={addCandidateBox}><AddIcon /></button>
                                </div>
                            </div >
                            {inputList}
                        </div>

                        :

                        <div style={{ clear: "both" }}>
                            <div className='assessmentToolBar'>
                                <h4 style={{ float: "left" }}>Upcomming</h4>

                                <div style={{ float: 'right' }}>
                                    <button className='candidateSort'><SortByAlphaIcon /></button>
                                    <select id='filterCandidate' style={{ textAlign: 'center', height: "20px", padding: "10px" }}>

                                        <option value="Name">Name</option>
                                        <option value="Stream">Stream</option>
                                        <option value="GradYear">Year of Graduation</option>
                                    </select>
                                    <button className='candidateAdd'><AddIcon /></button>
                                </div>
                            </div>
                            <AssessmentCentreInfo />
                            <div className="scrollArrows" style={{ float: "right", marginRight: "20px", marginTop: "20px" }}>
                                <button className="leftIcon"><ChevronLeftIcon /></button>
                                <button className="rightIcon"><ChevronRightIcon /></button>
                            </div>

                            <div className='assessmentToolBar'>
                                <h4 style={{ float: "left" }}>Past</h4>
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
                            <AssessmentCentreInfo />
                            <div className="scrollArrows" style={{ float: "right", marginRight: "20px", marginTop: "20px" }}>
                                <button className="leftIcon"><ChevronLeftIcon /></button>
                                <button className="rightIcon"><ChevronRightIcon /></button>
                            </div>
                        </div>
                    }
                </div>

            </div>

        </div>

    )
}


export default Recruiter;