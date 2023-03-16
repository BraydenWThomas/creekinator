// Components
import NavBar from '../NavBar';

// React
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Link, useParams, useNavigate } from 'react-router-dom';

// Material UI
import { Avatar, Divider, Tab, Stack, Button, FormControl, Container, Typography, Box, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import NotificationsIcon from '@mui/icons-material/Notifications';

const ViewUpcomingAC = () => {
  // AC Details
  const [ac, setAc] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [tabValue1, setTabValue1] = useState("1");
  const [tabValue2, setTabValue2] = useState("1");
  const [tabValue3, setTabValue3] = useState("1");
  const [tabValue4, setTabValue4] = useState("1");

  // Get AC + Recruiter info
  const [recruiters, setRecruiters] = useState([]);
  const [acCoordinator, setAcCoordinator] = useState('');
  const [interviewPacks, setInterviewPacks] = useState([]);

  // Scheduled interview details
  const [interviewDetails, setInterviewDetails] = useState([]);
  

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

  const [interviewsForAC, setInterviewsForAC] = useState([]);
  const [interviewDetailsForAC, setInterviewDetailsForAC] = useState([]);
  // const promises = [];
  // for (var i = 0; i < interviewDetails.length; i++) {
  //   promises.push(fetch("http://localhost:8080/api/interview/" + interviewDetails[i].id + "/getAC"))
  // }
  // Promise.all(promises)
  //   .then(data => {
  //     fetch("http://localhost:8080/api")
  //       .then((response => {
  //         console.log(response)
  //         response.json()
  //           .then(data => setInterviewsForAC(data))
  //       })).catch(error => console.log('error', error));
  //   })

  useEffect(() => {
    setInterviewsForAC(interviewDetails.slice().fill([]));
  }, [interviewDetails])
  // Get interview details for AC
  // useEffect(() => {
  const getACDetails = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    for (var i = 0; i < interviewDetails.length; i++) {
      fetch("http://localhost:8080/api/interview/" + interviewDetails[i].id + "/getAC", requestOptions)
        .then(response => response.json())
        // .then(data => setInterviewsForAC(interviewsForAC.map((e, i) => (i === i ? !e : data))))
        .then (data => setInterviewsForAC(data.id))
        .catch(error => console.log('error', error));
      
      if (interviewsForAC === ac.id) {
        interviewDetailsForAC[i] = interviewDetails[i]
      } 
    }
    console.log(interviewsForAC)
      console.log(interviewDetailsForAC)
      // Promise.all([
      //   fetch("http://localhost:8080/api/interview/" + interviewDetails[i].id + "/getAC", requestOptions)
      // ]).then((responses => {
      //   console.log(responses)
      //   responses[0].json()
      //     .then(data => setInterviewsForAC(data.id))
      // })).catch(error => console.log('error', error));
  }
  // }, [interviewDetails])

  // console.log(interviewDetails)
  // console.log(interviewsForAC)
  // console.log(interviewDetailsForAC)

  // Format LocalDate, LocalTime objects from java to dayjs object for javascript
  dayjs.extend(customParseFormat);
  const formatStart = dayjs(ac.start_time, "hh:mm:ss");
  const formatEnd = dayjs(ac.finish_time, "hh:mm:ss");

  const dateFormat =
    dayjs(ac.date).format("dddd, DD MMMM YYYY") + " " +
    formatStart.format("LT") + " - " +
    formatEnd.format("LT")

  const handleChangeInterview1 = (event, newValue) => {
    setTabValue1(newValue);
  }

  const handleChangeInterview2 = (event, newValue) => {
    setTabValue2(newValue);
  }

  const handleChangeInterview3 = (event, newValue) => {
    setTabValue3(newValue);
  }

  const handleChangeInterview4 = (event, newValue) => {
    setTabValue4(newValue);
  }

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
                  {/* {candidates.map(candidate => 
                    (interviewDetails)
                  )} */}
                  <TabContext value={tabValue1}>
                    <TabList onChange={handleChangeInterview1}>
                      <Tab value="1" label="John Doe" />
                      <Tab value="2" label="John Doe" />
                      <Tab value="3" label="John Doe" />
                      <Tab value="4" label="John Doe" />
                    </TabList>
                    <TabPanel value="1">
                      <Button variant="contained"> View profile </Button>
                      <Button variant="contained"> View interview form </Button>
                    </TabPanel>
                    <TabPanel value="2">
                      <Button variant="contained"> View profile </Button>
                      <Button variant="contained"> View interview form </Button>
                    </TabPanel>
                    <TabPanel value="3">
                      <Button variant="contained"> View profile </Button>
                      <Button variant="contained"> View interview form </Button>
                    </TabPanel>
                    <TabPanel value="4">
                      <Button variant="contained"> View profile </Button>
                      <Button variant="contained"> View interview form </Button>
                    </TabPanel>
                  </TabContext>
                </div>
              )}
            </div>

            {/* <div className="technical-interview" style={{ float: 'left', width: '100%' }}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography component="h2" variant="h5"> Technical Interviewer </Typography>

              {interviewers.map(interviewer =>
                (interviewer.tech === true) &&
                <div key={interview.id} style={{ float: 'left', width: '50%' }}>
                  <Typography component="h3" variant="h5"> {interviewer.name} </Typography>
                  {candidates.map(candidate =>
                    ()
                    <TabContext value={tabValue1}>
                      <TabList onChange={handleChangeInterview1}>
                        <Tab value="1" label={candidate.name} />
                      </TabList>
                      <TabPanel value="1">
                        <Button variant="contained"> View profile </Button>
                        <Button variant="contained"> View interview form </Button>
                      </TabPanel>
                    </TabContext>
                  )}
                </div>
              )}
            </div> */}

            <div className="interview-pack" style={{ float: 'left', width: '100%' }}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography component='h3' variant='h5' mb={2}>Interview Packs</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="outlined"> Sales Pack A </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="outlined"> Technical Pack A </Button>
                </Grid>
              </Grid>
            </div>

            <div className="bottom-buttons">
              <Grid container spacing={2}>
                <Grid item xs sm={12}>
                  <Link to={`/recruiter/ac/update/${ac.id}`}>
                    <Button
                      fullWidth
                      variant="contained"
                    >
                      Update
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs sm={12}>
                  <Button
                    fullWidth
                    color='secondary'
                    variant="contained"
                    onClick={goBack}>
                    Back
                  </Button>
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
