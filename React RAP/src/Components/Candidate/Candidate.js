import NavBar from '../NavBar';
import React, { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Box, Divider, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Components
import '../Styling/RecruiterStyles.css';

// Material UI
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Menu, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const Candidate = () => {
    const candidate = {
        id: 1,
        title: "Mr",
        first_name: "John",
        middle_name: "William",
        last_name: "Smith",
        mobile_number: "0412321345",
        email: "JohnWSmith@Gmail.com",
        date_of_birth: "2023-03-08T14:59:34",
        address: "123 Magicalfairyland steet",
        graduation_year: "2023-03-08T14:59:34",
        degree: "Data Science",
        university: "Magic Uni",
        resume: "resume-link",
        applied_stream: "Java",
        recruit_phase: "RecruitPhase1",
        past_ac_result: "N/A"
    }
    
    return (
        <div className="pageSection" >

            <NavBar />

            <div className='bodySection' style={{ width: "100%" }}>

                <div className="header" style={{ display: "flex" }}>
                    <h1 style={{ flex: 1, margin: '1%', marginTop: '2%' }}>Dashboard - Candidate</h1>
                    <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
                        <NotificationsIcon fontSize="large" />
                        <Avatar src="/broken-image.jpg" />
                    </div>
                </div>

                <Divider variant='middle' />

                <div className='candidateProfle'>
                    <h2>Profile</h2>

                    <Box
                        sx={{
                            display: 'flex',
                            '& > :not(style)': {
                                m: 1,
                                width: '100%',
                                height: 300
                            }
                        }}>
                        <div className='candidateSelectBox' style={{ clear: "both" }}>

                            {/* convert this to table? Formatting looks very verbose */}
                            <div style={{ marginLeft: "20px" }}>
                                <div style={{ display: "flex", clear: "both" }}>

                                    <h3> {candidate.first_name + " " + candidate.last_name} </h3>
                                </div>
                                <div style={{ display: "flex", clear: "both" }}>

                                    <h3> {candidate.mobile_number} </h3>
                                </div>
                                <div style={{ display: "flex", clear: "both" }}>

                                    <h3> {candidate.email} </h3>
                                </div>
                                <div style={{ display: "flex", marginBottom: "20px", clear: "both" }}>
                                    <h3>  </h3>
                                </div>

                                <div style={{ display: "flex", marginBottom: "20px", clear: "both" }}>
                                    <h3>  </h3>
                                </div>

                                <div style={{ display: "flex", marginBottom: "20px", clear: "both" }}>
                                    <h3>  </h3>
                                </div>
                            </div>

                        </div>
                    </Box>
                </div>

                <Divider variant='middle' />

                <div className='candidateACs'>
                    <h2>Assessment Centres</h2>

                </div>
            </div>

        </div>
    )
}

export default Candidate;