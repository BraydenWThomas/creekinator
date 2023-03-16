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
  const [tabValue1, setTabValue1] = useState("1");
  const [tabValue2, setTabValue2] = useState("1");
  const [tabValue3, setTabValue3] = useState("1");
  const [tabValue4, setTabValue4] = useState("1");

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

    fetch("http://localhost:8080/api/ac/" + acId, requestOptions)
      .then(response => response.json())
      .then(data => { setAc(data) })
      .catch(error => console.log('error', error));
  }, [acId])

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
                  <Typography component="h4" variant="button" mb={2}> AC Coordinator: John Doe </Typography>
                </Stack>
              </div>
            </div>


            <div className="sales-interview" style={{ float: 'left', width: '100%' }}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography component="h2" variant="h5"> Sales Interviewer </Typography>

              <div style={{ float: 'left', width: '50%' }}>
                <Typography component="h3" variant="h5"> Interviewer 1 </Typography>
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
              <div className="right-side" style={{ float: 'left', width: '50%' }}>
                <div style={{ float: 'left' }}>
                  <Typography component="h3" variant="h5"> Interviewer 2 </Typography>
                  <TabContext value={tabValue2}>
                    <TabList onChange={handleChangeInterview2}>
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
              </div>
            </div>

            <div className="technical-interview" style={{ float: 'left', width: '100%' }}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography component="h2" variant="h5"> Technical Interviewer </Typography>

              <div style={{ float: 'left', width: '50%' }}>
                <Typography component="h3" variant="h5"> Interviewer 1 </Typography>
                <TabContext value={tabValue3}>
                  <TabList onChange={handleChangeInterview3}>
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
              <div className="right-side" style={{ float: 'left', width: '50%' }}>
                <div style={{ float: 'left' }}>
                  <Typography component="h3" variant="h5"> Interviewer 2 </Typography>
                  <TabContext value={tabValue4}>
                    <TabList onChange={handleChangeInterview4}>
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
              </div>
            </div>


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
