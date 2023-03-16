// Components
import NavBar from '../NavBar';

// React
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Link, useParams, useNavigate } from 'react-router-dom';

// Material UI
import { Avatar, Divider, Stack, Button, Container, Typography, Box, Grid } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import { TableViewOutlined } from '@mui/icons-material';

const ViewUpcomingAC = () => {
  // AC Details
  const [ac, setAc] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  // Get AC + Recruiter info
  const [recruiters, setRecruiters] = useState([]);
  const [acCoordinator, setAcCoordinator] = useState('');
  const [interviewPacks, setInterviewPacks] = useState([]);

  // Scheduled interview details
  const [interviewDetails, setInterviewDetails] = useState([]);
  const [interviewsForAC, setInterviewsForAC] = useState([]);
  
  // Link to specific AC
  const { acId } = useParams();

  // Go back to previous page
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  // Fetch AC details
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    Promise.all([
      fetch("http://localhost:8080/api/ac/" + acId, requestOptions),
      fetch("http://localhost:8080/api/ac/" + acId + "/showCandidates", requestOptions),
      fetch("http://localhost:8080/api/ac/" + acId + "/showInterviewers", requestOptions),
      fetch("http://localhost:8080/api/pack", requestOptions),
      fetch("http://localhost:8080/api/recruiter", requestOptions),
      fetch("http://localhost:8080/api/interview", requestOptions)
    ]).then((responses => {
      console.log(responses)
      responses[0].json()
        .then(data => { setAc(data) })
      responses[1].json()
        .then(data => { setCandidates(data) })
      responses[2].json()
        .then(data => { setInterviewers(data) })
      responses[3].json()
        .then(data => { setInterviewPacks(data) })
      responses[4].json()
        .then(data => { setRecruiters(data) })
      responses[5].json()
        .then(data => { setInterviewDetails(data) })
    })).catch(error => console.log('error', error));
  }, [acId]);

  // Get AC Coordinator for AC
  useEffect(() => {
    for (var i = 0; i < recruiters.length; i++) {
      if (recruiters[i].id === ac.coordinatorId) {
        setAcCoordinator(recruiters[i].name);
      };
    };
  }, [recruiters, ac.coordinatorId])
  
  // Get all detailed interviews
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    for (var i = 0; i < interviewDetails.length; i++) {
      fetch("http://localhost:8080/api/interviewDetailed/" + interviewDetails[i].id, requestOptions)
        .then(response => response.json())
        .then(data => setInterviewsForAC(old => [...old, data]))
        .catch(error => console.log('error', error));
    }
  }, [interviewDetails])  

  const GetScheduledInterviewDetails = ({ interview_type, id }) => {
    const interviewDetailsForAC = [];

    // Sales
    const candidatesForSales = [];
    const candidatesIdsForSales = [];
    const salesInterviewTimes = [];
    const salesInterviewPacks = [];

    // Tech
    const candidatesForTech = [];
    const candidatesIdsForTech = [];
    const techInterviewTimes = [];
    const techInterviewPacks = [];

    // Get interview details for this AC
    for (var i = 0; i < interviewsForAC.length; i++) {
      if (interviewsForAC[i].assessmentCenter.id === ac.id) {
        interviewDetailsForAC.push(interviewsForAC[i]);
      }
    }
    console.log(interviewDetailsForAC)

    // Get candidates for sales interviewers
    for (var i = 0; i < interviewDetailsForAC.length; i++) {
      if (interviewDetailsForAC[i].interviewer.tech === false && interviewDetailsForAC[i].interviewer.id === id) {
        candidatesForSales.push(interviewDetailsForAC[i].candidate.first_name + " " + 
                               interviewDetailsForAC[i].candidate.last_name)
        // Get candidate ids for sales interviewers
        candidatesIdsForSales.push(interviewDetailsForAC[i].candidate.id)
        // Get sales interviews times
        salesInterviewTimes.push(interviewDetailsForAC[i].interview.interviewTime)
        // Get sales interview packs
        salesInterviewPacks.push(interviewDetailsForAC[i].packs[0].pack_name)
      }
    }

    // Get candidates for technical interviewers
    for (var i = 0; i < interviewDetailsForAC.length; i++) {
      if (interviewDetailsForAC[i].interviewer.tech === true && interviewDetailsForAC[i].interviewer.id === id) {
        candidatesForTech.push(interviewDetailsForAC[i].candidate.first_name + " " + 
                               interviewDetailsForAC[i].candidate.last_name)
        // Get candidate ids for tech interviewers
        candidatesIdsForTech.push(interviewDetailsForAC[i].candidate.id)
        // Get tech interviews times
        techInterviewTimes.push(interviewDetailsForAC[i].interview.interviewTime)
        // Get tech interview packs
        techInterviewPacks.push(interviewDetailsForAC[i].packs[0].pack_name)
      }
    }

    // Format times
    dayjs.extend(customParseFormat);

    for (var i = 0; i < salesInterviewTimes.length; i++) {
      salesInterviewTimes[i] = dayjs(salesInterviewTimes[i], "hh:mm:ss")
    } 

    for (var i = 0; i < techInterviewTimes.length; i++) {
      techInterviewTimes[i] = dayjs(techInterviewTimes[i], "hh:mm:ss")
    } 

    if (interview_type === "sales") {
      return (
        <div>
          <TableContainer>
            <Table>
              <TableBody>
                {candidatesForSales.map((candidate, index) =>
                  <TableRow key={index}>
                    <TableCell> 
                      <Link to={`/recruiter/candidate/info/${candidatesIdsForSales[index]}`}>
                        {candidate}
                      </Link>
                    </TableCell>
                    <TableCell> {salesInterviewTimes[index].format("LT")} </TableCell>
                    <TableCell> {salesInterviewPacks[index]} </TableCell>
                  </TableRow>  
                )}
              </TableBody>
            </Table>
          </TableContainer> 
        </div>
      )
    }

    if (interview_type === "tech") {
      return (
        <div>
          <TableContainer>
            <Table>
              <TableBody>
                {candidatesForTech.map((candidate, index) =>
                  <TableRow key={index}>
                    <TableCell> 
                      <Link to={`/recruiter/candidate/info/${candidatesIdsForTech[index]}`}>
                        {candidate}
                      </Link>
                    </TableCell>
                    <TableCell> {techInterviewTimes[index].format("LT")} </TableCell>
                    <TableCell> {techInterviewPacks[index]} </TableCell>
                  </TableRow>  
                )}
              </TableBody>
            </Table>
          </TableContainer> 
        </div>
      )
    }
                  
    console.log(candidatesForSales)
    console.log(candidatesForTech)
  }

  console.log(candidates)

  // Format LocalDate, LocalTime objects from java to dayjs object for javascript
  dayjs.extend(customParseFormat);
  const formatStart = dayjs(ac.start_time, "hh:mm:ss");
  const formatEnd = dayjs(ac.finish_time, "hh:mm:ss");

  const dateFormat =
    dayjs(ac.date).format("dddd, DD MMMM YYYY") + " " +
    formatStart.format("LT") + " - " +
    formatEnd.format("LT")
  
  return (
    <div>
      <NavBar />
      <div className="content" style={{ float: 'left', width: '80%' }}>
        <Container component="main">
          <div className="header" style={{ display: "flex" }}>
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>Upcoming Assessment Centre</Typography>
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

            <div className="ac-title">
              <div style={{ float: 'left', width: '80%' }}>
                <Typography component="h2" variant="h4"> {ac.title} </Typography>
                <Typography component="h3" variant="h5" mb={2}> {dateFormat} </Typography>
              </div>

              <div style={{ float: 'left', width: '20%', marginTop: '4%' }}>
                <Stack direction="row" spacing={3}>
                  <Avatar> J </Avatar>
                  <Typography component="h4" variant="button" mb={2}> AC Coordinator: {acCoordinator} </Typography>
                </Stack>
              </div>
            </div>

            <div className="sales-interview" style={{ float: 'left', width: '100%' }}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography component="h2" variant="h5"> Sales Interviewer </Typography>
              {interviewers.map(interviewer =>
                (interviewer.tech === false) &&
                <div key={interviewer.id} style={{ float: 'left', width: '50%' }}>
                  <Typography component="h3" variant="h5"> {interviewer.name} </Typography>
                  <GetScheduledInterviewDetails interview_type="sales" id={interviewer.id} />
                </div>
              )}
            </div>

            <div className="technical-interview" style={{ float: 'left', width: '100%' }}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography component="h2" variant="h5"> Technical Interviewer </Typography>

              {interviewers.map(interviewer =>
                (interviewer.tech === true) &&
                <div key={interviewer.id} style={{ float: 'left', width: '50%' }}>
                  <Typography component="h3" variant="h5"> {interviewer.name} </Typography>
                  <GetScheduledInterviewDetails interview_type="tech" id={interviewer.id} />
                </div>
              )}
            </div>

            <div className="bottom-buttons">
              <Grid container spacing={2}>
                <Grid item xs sm={12}>
                  <Link to={`/recruiter/ac/update/${ac.id}`}>
                    <Button
                      fullWidth
                      variant="contained">
                      Update AC Details
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs sm={12}>
                  {/* <Link to={`/recruiter/ac/update/${ac.id}`}> */}
                    <Button
                      fullWidth
                      variant="contained">
                      Update Schedule
                    </Button>
                  {/* </Link> */}
                </Grid>
                <Grid item xs sm={12}>
                  <Link to={"/recruiter"}>
                    <Button
                      fullWidth
                      color='secondary'
                      variant="contained"
                      onClick={goBack}>
                      Back
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Container>
      </div>
    </div >
  )
}

export default ViewUpcomingAC;
