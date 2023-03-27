// React
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'

// Components
import NavBar from "../NavBar";

// Material UI
import { Backdrop, Container, Divider, Fade, Grid, Modal, TextField, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/system";

const CandidateInformationRec = ({ readModalOpen, setReadModalOpen, candidateId }) => {
  // Candidate Details
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');

  // Candidate Application Details
  const [appliedStream, setAppliedStream] = useState('');
  const [recruitmentPhase, setRecruitmentPhase] = useState('');
  const [pastACResult, setPastACResult] = useState('');

  // To Link to specific candidate
  const [candidate, setCandidate] = useState([]);

  const [readOnly, setReadOnly] = useState(true);

  // Fetch specific candidate
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch("http://localhost:8080/api/candidate/" + candidateId, requestOptions)
      .then(response => response.json())
      .then(data => { setCandidate(data) })
      .catch(error => console.log('error', error));
  }, [candidateId])

  // Create new states to update Candidate details
  useEffect(() => {
    // Candidate Details
    setTitle(candidate.title);
    setFirstName(candidate.first_name);
    setMiddleName(candidate.middle_name);
    setLastName(candidate.last_name);
    setMobilePhone(candidate.mobile_number);
    setEmail(candidate.email);
    setDob(dayjs(candidate.date_of_birth));
    setAddress(candidate.address);
    setGradYear(candidate.graduation_year);
    setDegree(candidate.degree);
    setUniversity(candidate.university);

    // Application Details
    setAppliedStream(candidate.applied_stream);
    setRecruitmentPhase(candidate.recruit_phase);
    setPastACResult(candidate.past_ac_result);
  }, [candidate])

  const pageTitle = candidate.first_name + " " + candidate.last_name + "'s " + "Profile"

  const handleReadModalClose = () => {
    setReadModalOpen(false);

    setTitle('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setMobilePhone('');
    setEmail('');
    setDob('');
    setAddress('');
    setGradYear('');
    setDegree('');
    setUniversity('');
    setAppliedStream('');
    setRecruitmentPhase('');
    setPastACResult('');
  }
  

  const style = {
    editModal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      borderRadius: '15px',
      boxShadow: 24,
      p: 4,
    }
  };

  return (
    <Modal
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
      open={readModalOpen}
      onClose={handleReadModalClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={readModalOpen}>
        <Box sx={style.editModal}>
          <Container component="main">
            <div className="header" style={{ display: "flex" }}>
              <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>{pageTitle}</Typography>
            </div>
            <Box
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                mt: 3,
              }}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <div className="details">
                <Typography component="h2" variant="h4" mb={2}> Details </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      id="title_select"
                      label="Title"
                      type="text"
                      value={title}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id="outlined-first-name-input"
                      label="First Name"
                      type="text"
                      value={firstName}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id="outlined-middle-name-input"
                      label="Middle Name"
                      type="text"
                      value={middleName}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="outlined-last-name-input"
                      label="Last Name"
                      type="text"
                      value={lastName}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-mobile-input"
                      label="Mobile Phone"
                      type="number"
                      value={mobilePhone}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-email-input"
                      label="Email"
                      type="text"
                      value={email}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      id="outlined-date-input"
                      label="D.O.B"
                      type="text"
                      value={dob}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      id="outlined-address-input"
                      label="Address"
                      type="text"
                      value={address}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="outlined-year-input"
                      label="Graduation Year"
                      type="number"
                      value={gradYear}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="outlined-degree-input"
                      label="Degree"
                      type="text"
                      value={degree}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="outlined-university-input"
                      label="University"
                      type="text"
                      value={university}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </div>

              <Divider sx={{ mt: 2, mb: 2 }} />

              <div className="application-details">
                <Typography component="h2" variant="h4" mb={2}> Application Details </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button variant="outlined" component="label" fullWidth>
                      View Resume
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="applied-stream-select"
                      label="Applied Stream"
                      type="text"
                      value={appliedStream}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth />
                  </Grid>
                  <Grid item xs sm={6}>
                    <TextField
                      id="recruitment-phase-select-label"
                      label="Recruitment Phase"
                      type="text"
                      value={recruitmentPhase}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth />
                  </Grid>
                  <Grid item xs sm={6}>
                    <TextField
                      id="past-ac-result-input"
                      label="Past AC Result"
                      type="text"
                      value={pastACResult}
                      InputProps={{
                        readOnly: readOnly
                      }}
                      fullWidth />
                  </Grid>
                  <Grid item xs sm={12}>
                      <Button
                        onClick={() => setReadOnly(false)}
                        variant="contained"
                        component="label"
                        fullWidth
                        style={{ marginBottom: "16px" }}>
                        Update
                      </Button>
                    <Grid item xs sm={12}>
                      <Link to="/recruiter">
                        <Button
                          variant="contained"
                          component="label"
                          color="secondary"
                          fullWidth
                          onClick={handleReadModalClose}>
                          Close
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Container>
        </Box>
      </Fade>
    </Modal>
  )
}

export default CandidateInformationRec;
