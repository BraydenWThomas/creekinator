import NavBar from '../NavBar';
import React, { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


// Components
import '../Styling/RecruiterStyles.css';
import { CompareSharp } from '@mui/icons-material';
import { Container } from '@mui/system';

const Candidate = () => {
  const [candidate, setCandidate] = useState({});
  const [upcomingAC, setUpcomingAC] = useState({});
  const [pastAC, setPastAC] = useState([]);
  const [ongoingAC, setOngoingAC] = useState({});

  const [acs, setACs] = useState([
    {
      id: 1,
      title: "AC 1",
      date: "2023-03-07",
      start_time: "14:30:00",
      finish_time: "16:30:00",
      completed: true,
      coordinatorId: 1
    },
    {
      id: 2,
      title: "AC 2",
      date: "2023-03-08",
      start_time: "14:30:00",
      finish_time: "16:30:00",
      completed: true,
      coordinatorId: 2
    },
    {
      id: 3,
      title: "AC 3",
      date: "2023-03-31",
      start_time: "12:50:00",
      finish_time: "14:30:00",
      completed: true,
      coordinatorId: 3
    },
    {
      id: 4,
      title: "AC 4",
      date: "2023-03-24",
      start_time: "11:30:00",
      finish_time: "18:30:00",
      completed: false,
      coordinatorId: 4
    }
  ]);
  console.log(localStorage.getItem('candidateId'))
  // Fetch candidate inforamtion, using corresponding user ID
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("http://localhost:8080/api/candidate/" + localStorage.getItem('candidateId'), requestOptions)
      .then(response => response.json())
      .then(result => setCandidate(result))
      .catch(error => console.log('error', error));


  }, []);

  useEffect(() => {

    let curDate = new Date()

    let pastEvents = []
    for (var i = 0; i < acs.length; i++) {
      let acStartDate = new Date(acs[i].date + "T" + acs[i].start_time)
      let acEndDate = new Date(acs[i].date + "T" + acs[i].finish_time)


      if (acEndDate < curDate) {

        pastEvents.push(acs[i])

      }
      else if (acStartDate > curDate) {

        setUpcomingAC(acs[i])
      }
      else if (acStartDate < curDate && acEndDate > curDate) {

        setOngoingAC(acs[i])
      }

    }

    setPastAC(pastEvents)
  }, []);


  // Fetch ACs, checks for upcoming and past ACs
  // useEffect(() => {
  //     var requestOptions = {
  //         method: 'GET',
  //         redirect: 'follow'
  //     };

  //     fetch("http://localhost:8080/api/candidate/" + localStorage.getItem('candidateId') + "/showACs", requestOptions)
  //         .then(response => response.json())
  //         .then(result => setACs(result))
  //         .catch(error => console.log('error', error));

  // }, [candidate]);

  const displayAC = (ac) => {
    return (
      <div className='candidateProfile'>
        <Paper sx={{ borderRadius: 2 }}>
          <TableContainer>
            <Table aria-label="Users table">
              <TableHead style={{ fontWeight: 'bold' }}>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Interviewer 1</TableCell>
                  <TableCell>Interviewer 2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{ac.title}</TableCell>
                  <TableCell>{ac.date}</TableCell>
                  <TableCell>{`${ac.start_time} - ${ac.finish_time}`}</TableCell>
                  <TableCell>{ac.completed ? "Completed" : "Upcoming"}</TableCell>
                  <TableCell>Pretty good</TableCell>
                  <TableCell>New to webdev but has potential</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <br />
      </div>
    )
  }



  return (
    <div className="pageSection" >

      <NavBar />

      <div className="content" style={{ float: 'left', width: '80%' }}>
        <Container component="main">
          <div className="header" style={{ display: "flex" }}>
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>Candidate Dashboard</Typography>
            <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
              <NotificationsIcon fontSize="large" />
              <Avatar src="/broken-image.jpg" />
            </div>
          </div>
          <Box
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              mt: 3,
            }}>
            <Divider sx={{ mt: 2, mb: 2 }} />

            <div>
              <Typography component="h2" variant="h4" mb={2}> Profile </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className='candidateProfile' >

                    {/* 
                            stylistic demands to Chris >:(
                                - More space on the left and right
                                - Bold font for text 
                                - Fix the gap at the bottom of profile
                                - More padding between tiles
                                - align tiles
                            */}
                    <Paper sx={{ borderRadius: 2 }}>
                      {/* Dispalys the information of the candidate */}
                      <TableContainer>
                        <Table aria-label="Users table">
                          {/* <TableHead>
                                                        <TableRow>
                                                            <TableCell colSpan="10" style={{ textAlign: 'center', fontWeight: 'bold' }}>Profile Information</TableCell>
                                                        </TableRow>
                                                    </TableHead> */}
                          <TableHead >
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
                    </Paper>
                  </div>
                </Grid>
              </Grid>
            </div>

            <Divider sx={{ mt: 2 }} />

            <div className='assessment-centreInfo'>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* Displays ongoing assessment centres of the candidate */}
                  <div>
                    {Object.keys(ongoingAC).length !== 0 ?
                      <div>
                        <Typography component="h2" variant="h4" mb={2}> Ongoing Assessment Centre </Typography>
                        {displayAC(ongoingAC)}
                      </div> :
                      <br />}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {/* Displays upcoming assessment centres of the candidate */}
                  <div>

                    {Object.keys(upcomingAC).length !== 0 ? <div>
                      <Typography component="h2" variant="h4" mb={2}> Upcoming Assessment Centre </Typography>
                      {displayAC(upcomingAC)} </div> : <br />}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  {/* Displays past assessment centres of the candidate */}
                  <div>
                    {pastAC != [] ?
                      <div>
                        <Typography component="h2" variant="h4" mb={2}> Past Assessment Centre </Typography>
                        {pastAC.map((past) => displayAC(past))}
                      </div> : <br />}
                  </div>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  )
}

export default Candidate;