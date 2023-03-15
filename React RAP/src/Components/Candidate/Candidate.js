import NavBar from '../NavBar';
import React, { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Box, Divider } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


// Components
import '../Styling/RecruiterStyles.css';

const Candidate = () => {
    const [candidateId, setCandidateId] = useState("");
    const [candidateAC, setCandidateAC] = useState("");

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

    useEffect(() => {


        var requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/candidate?firstName=&lastName&appliedStream=Java", requestOptions)
            .then(response => response.text())
            .then(result => setCandidateId(result.candidateId))
            .catch(error => console.log('error', error));

    }, []);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/candidate/"+ candidateId + "/showACs", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }, [candidateId]);

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


                    <div className='candidateProfile' >

                        {/* 
                            stylistic demands to Chris >:(
                                - More space on the left and right
                                - Bold font for text 
                                - Fix the gap at the bottom of profile
                                - More padding between tiles
                                - align tiles
                            */}

                        <Box
                            sx={{

                                display: 'flex',
                                minWidth: 500,
                                '& > :not(style)': {
                                    m: 1,
                                    width: '100%',
                                    height: 300
                                },
                                backgroundColor: 'white'
                            }}
                        >

                            <TableContainer>

                                <Table aria-label="Users table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan="10" style={{ textAlign: 'center', fontWeight: 'bold' }}>Profile Information</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableHead style={{ fontWeight: 'bold' }}>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Mobile</TableCell>
                                            <TableCell>E-mail</TableCell>
                                            <TableCell>Date of birth</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>Graduation Year</TableCell>
                                            <TableCell>Degree</TableCell>
                                            <TableCell>University</TableCell>
                                            <TableCell>Resume</TableCell>
                                            <TableCell>Applied Stream</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{candidate.first_name + " " + candidate.middle_name + " " + candidate.last_name}</TableCell>
                                            <TableCell>{candidate.mobile_number}</TableCell>
                                            <TableCell>{candidate.email}</TableCell>
                                            <TableCell>{candidate.date_of_birth}</TableCell>
                                            <TableCell>{candidate.address}</TableCell>
                                            <TableCell>{candidate.graduation_year}</TableCell>
                                            <TableCell>{candidate.degree}</TableCell>
                                            <TableCell>{candidate.university}</TableCell>
                                            <TableCell>{candidate.resume}</TableCell>
                                            <TableCell>{candidate.applied_stream}</TableCell>

                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>


                    </div>
                </div>

                <Divider variant='middle' />

                <div className='candidateProfle'>
                    <h2>Upcoming Assessment Centre</h2>


                    <div className='candidateProfile' >

                        <Box
                            sx={{

                                display: 'flex',
                                minWidth: 500,
                                '& > :not(style)': {
                                    m: 1,
                                    width: '100%',
                                    height: 300
                                },
                                backgroundColor: 'white'
                            }}
                        >

                            <TableContainer>

                                <Table aria-label="Users table">
                                    <TableHead style={{ fontWeight: 'bold' }}>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>StartTime</TableCell>
                                            <TableCell>Endtime</TableCell>

                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Cooking</TableCell>
                                            <TableCell>12</TableCell>
                                            <TableCell>12</TableCell>

                                        </TableRow>

                                    </TableBody>
                                    <TableHead style={{ fontWeight: 'bold' }}>

                                        <TableRow>


                                            {/* 
                                                Mental Note:
                                                - change from table to  some kind of box to hold longer forms of text
                                                */}
                                            <TableCell colSpan="1" style={{ textAlign: 'center', fontWeight: 'bold' }}>Interviewer 1</TableCell>
                                            <TableCell colSpan="2" style={{ textAlign: 'center', fontWeight: 'bold' }}>Interviewer 2</TableCell>

                                        </TableRow>
                                        <TableRow>

                                            <TableCell colSpan="1" style={{ textAlign: 'center' }}>Commendggt</TableCell>
                                            <TableCell colSpan="2" style={{ textAlign: 'center' }}>l</TableCell>

                                        </TableRow>

                                    </TableHead>
                                </Table>
                            </TableContainer>

                        </Box>


                    </div>
                </div>

                <Divider variant='middle' />
                <div className='candidateProfle'>
                    <h2>Past Assessment Centre</h2>


                    <div className='candidateProfile' >
                        <Box
                            sx={{

                                display: 'flex',
                                minWidth: 500,
                                '& > :not(style)': {
                                    m: 1,
                                    width: '100%',
                                    height: 300
                                },
                                backgroundColor: 'white'
                            }}
                        >

                            <TableContainer>

                                <Table aria-label="Users table">
                                    <TableHead style={{ fontWeight: 'bold' }}>
                                        <TableRow>
                                            <TableCell>Past AC</TableCell>
                                            <TableCell>Start Time</TableCell>
                                            <TableCell>End Time</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Data Enginner AC</TableCell>
                                            <TableCell>12:00</TableCell>
                                            <TableCell>18:00</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan="1" style={{ textAlign: 'center', fontWeight: 'bold' }}>Interviewer 1</TableCell>
                                            <TableCell colSpan="2" style={{ textAlign: 'center', fontWeight: 'bold' }}>Interviewer 2</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan="1" style={{ textAlign: 'center' }}>Pretty good</TableCell>
                                            <TableCell colSpan="2" style={{ textAlign: 'center' }}>Dont hire this guy</TableCell>
                                        </TableRow>



                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>


                    </div>
                </div>

                <Divider variant='middle' />
            </div>
        </div>
    )
}

export default Candidate;