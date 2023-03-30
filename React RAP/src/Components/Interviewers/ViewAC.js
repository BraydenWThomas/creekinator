// React + css
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate, Link } from 'react-router-dom'
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

// Webpage Components
import NavBar from "../NavBar";

// Material UI
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { Container, Divider, Grid, Stack, Typography, TextField} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { margin } from "@mui/system";

const ViewAC = () => {
  const [value, setValue] = useState(0);
  const candidatesDummy = ["John", "Robert", "Bob", "Joe"]
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showTextArea = (user) => {
    console.log("dsfsd")
    return (
      <textarea placeholder={user} rows={"5"} cols={"100"} style={{ resize: "none" }} />
    )
  };

  // AC Details
  const [ac, setAc] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  // Scheduled interview details
  const [interviewDetails, setInterviewDetails] = useState([]);
  const [interviewsForAC, setInterviewsForAC] = useState([]);

  // Link to specific AC
  const { acId } = useParams();

  // Get AC + Recruiter info
  const [recruiters, setRecruiters] = useState([]);
  const [acCoordinator, setAcCoordinator] = useState('');
  const [interviewPacks, setInterviewPacks] = useState([]);

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
  }, [recruiters, ac.coordinatorId]);

  // Format LocalDate, LocalTime objects from java to dayjs object for javascript
  dayjs.extend(customParseFormat);
  const formatStart = dayjs(ac.start_time, "hh:mm:ss");
  const formatEnd = dayjs(ac.finish_time, "hh:mm:ss");

  const dateFormat =
    dayjs(ac.date).format("dddd, DD MMMM YYYY") + " " +
    formatStart.format("LT") + " - " +
    formatEnd.format("LT")

  return (

    <div style={{display:'flex'}}>
      <NavBar />

      <div className="content" style={{ float: 'left', width: '100%', paddingLeft:20, paddingRight:20 }}>
        
          <div className="header" style={{ display: "flex" }}>
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>Assessment Centre</Typography>
            <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "1%" }}>
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
                  <Avatar src="/broken-image.jpg" />
                  <Typography component="h4" variant="button" mb={2}> {acCoordinator} </Typography>
                </Stack>
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <Typography component="h2" variant="h5"> Assigned Candidates </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
            </div>
            <Box sx={{}}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                centered
                variant="fullWidth"
              >
                {candidatesDummy.map((user, index) =>
                  <Tab
                    value={index}
                    label={user}
                    style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "none" }}
                    key={index} />
                )}
              </Tabs>
              <Box sx={{ display: "block" }} >
                {value === 0 && (
                  <TextField
                    id="outlined-textarea"
                    label="Feedback"
                    
                    fullWidth
                    multiline
                    rows={8} 
                    sx={{ marginTop: "10pt" }}/>
                )}
                {value === 1 && (
                  <TextField
                    id="outlined-textarea"
                    label="Feedback"
                    
                    fullWidth
                    multiline
                    rows={8} 
                    sx={{ marginTop: "10pt" }} />
                )}
                {value === 2 && (
                  <TextField
                    id="outlined-textarea"
                    label="Feedback"
                    
                    fullWidth
                    multiline
                    rows={8}
                    sx={{ marginTop: "10pt" }} />
                )}
                {value === 3 && (
                 <TextField
                  id="outlined-textarea"
                  label="Feedback"
                  
                  fullWidth
                  multiline
                  rows={8} 
                  sx={{ marginTop: "10pt" }} />
                )}
              </Box>
            </Box>
            <div style={{ clear: "both", padding: "20px 0 0 0" }}>
              <div style={{ float: "right" }}>
                <Link to={`/recruiter/candidate/info/:candidateId`}>
                  <Button variant="contained" component="label" sx={{ m: 5 }}>
                    View Profile
                  </Button>
                </Link>
                <Button variant="contained" component="label" sx={{ m: 5 }}>View Interview Form</Button>
              </div>
            </div>
            <div style={{ clear: "both" }}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography component="h2" variant="h5" mb={2}> Assigned Interviewers </Typography>
              <div className="assignedInterviewers" style={{ width: "80%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <div className="salesColumn" style={{ float: "left" }}>
                      {interviewers.map((interviewer, index) =>
                        (interviewer.tech === false) &&
                        <div key={index}>
                          <Typography component='h3' variant='h7'>Technical Interviewer {index - 1} </Typography>
                          <Typography component='p' variant='body'>{interviewer.name}</Typography>
                          <Typography component='h3' variant='h7'>Assigned Candidates</Typography>

                          <ul style={{ listStyleType: "none" }}>
                            <li>Kimberleigh Chambers</li>
                            <li>Jessi Dixon</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="techColumn" style={{ float: "right" }}>
                      {interviewers.map((interviewer, index) =>
                        (interviewer.tech === true) &&
                        <div key={index}>
                          <Typography component='h3' variant='h7'>Sales Interviewer {index + 1} </Typography>
                          <Typography component='p' variant='body'>{interviewer.name}</Typography>
                          <Typography component='h3' variant='h7'>Assigned Candidates</Typography>

                          <ul style={{ listStyleType: "none" }}>
                            <li>Burt Everill</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Link to={"/interviewer"}>
                  <Button
                    variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
                    Back
                  </Button>
                </Link>
              </div>
            </div>
          </Box>
        
      </div>
    </div>
  )
}


export default ViewAC;