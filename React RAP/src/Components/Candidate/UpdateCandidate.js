// React
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

// Components
import NavBar from "../NavBar";

// Material UI
import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
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
import { Container } from "@mui/system";
// import { useAnimatedValue } from "react-native/types";


const UpdateCandidate = () => {
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
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState([]);
  const [getName, setGetName] = useState([])

  // Go back to previous page
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  // Fetch specific candidate
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    Promise.all([
      fetch("http://localhost:8080/api/candidate/" + candidateId, requestOptions),
      fetch("http://localhost:8080/api/candidate/" + candidateId, requestOptions)
    ]).then((responses => {
      console.log(responses)
      responses[0].json()
        .then(data => { setCandidate(data) })
      responses[1].json()
        .then(data => { setGetName(data) })
    })).catch(error => console.log('error', error));
  }, [candidateId]);

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

  // Handle update
  const handleSubmit = () => {

    const body =
      JSON.stringify({
        id: candidate.id,
        title: title,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        mobile_number: mobilePhone,
        email: email,
        date_of_birth: dob.format('YYYY-MM-DD'),
        address: address,
        graduation_year: gradYear,
        degree: degree,
        university: university,
        resume: "resume-link",
        applied_stream: appliedStream,
        recruit_phase: recruitmentPhase,
        past_ac_result: pastACResult
      });

    const requestOptions = {
      method: 'PUT',
      body: body,
      redirect: 'follow',
      headers: { 'content-type': 'application/json' },
    };

    fetch("http://localhost:8080/api/candidate", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  var pageTitle = getName.first_name + " " + getName.last_name + "'s " + "Profile"

  return (
    <div className="update-candidate">
      <NavBar />
      <div className="content" style={{ float: 'left', width: '80%' }}>
        <Container component="main">
          <div className="header" style={{ display: "flex" }}>
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>{pageTitle}</Typography>
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
            <div className="details">
              <Typography component="h2" variant="h4" mb={2}> Details </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <FormControl fullWidth>
                    <InputLabel id="title-select-label"> Title </InputLabel>
                    <Select
                      labelId="title-select-label"
                      id="title-select"
                      label="Title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}>
                      <MenuItem value={"Mr"}> Mr </MenuItem>
                      <MenuItem value={"Ms"}> Ms </MenuItem>
                      <MenuItem value={"Miss"}> Miss </MenuItem>
                      <MenuItem value={"Mrs"}> Mrs </MenuItem>
                      <MenuItem value={"Dr"}> Dr </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="outlined-first-name-input"
                    label="First Name"
                    type="text"
                    autoComplete="current-first-name"
                    fullWidth
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="outlined-middle-name-input"
                    label="Middle Name"
                    type="text"
                    autoComplete="current-middle-name"
                    fullWidth
                    value={middleName}
                    onChange={(event) => setMiddleName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="outlined-last-name-input"
                    label="Last Name"
                    type="text"
                    autoComplete="current-last-name"
                    fullWidth
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-mobile-input"
                    label="Mobile Number"
                    type="number"
                    autoComplete="current-mobile"
                    fullWidth
                    value={mobilePhone}
                    onChange={(event) => setMobilePhone(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="text"
                    autoComplete="current-email"
                    fullWidth
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      label="D.O.B"
                      value={dob}
                      onChange={(newDob) => setDob(newDob)}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    id="outlined-address-input"
                    label="Address"
                    type="text"
                    autoComplete="current-address"
                    fullWidth
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="outlined-year-input"
                    label="Graduation Year"
                    type="number"
                    autoComplete="current-year"
                    fullWidth
                    value={gradYear}
                    onChange={(event) => setGradYear(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="outlined-degree-input"
                    label="Degree"
                    type="text"
                    autoComplete="current-degree"
                    fullWidth
                    value={degree}
                    onChange={(event) => setDegree(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="outlined-university-input"
                    label="University"
                    type="text"
                    autoComplete="current-university"
                    fullWidth
                    value={university}
                    onChange={(event) => setUniversity(event.target.value)}
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
                    Upload Resume
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="applied-stream-select-label">Applied Stream</InputLabel>
                    <Select
                      labelId="applied-stream-select-label"
                      id="applied-stream-select"
                      label="Applied Stream"
                      value={appliedStream}
                      onChange={(event) => setAppliedStream(event.target.value)}
                    >
                      <MenuItem value="Business Analyst"> Business Analyst </MenuItem>
                      <MenuItem value="Business Intelligence"> Business Intelligence </MenuItem>
                      <MenuItem value="Cloud (AWS)"> Cloud (AWS) </MenuItem>
                      <MenuItem value="Technical Analyst"> Technical Analyst </MenuItem>
                      <MenuItem value="Software Development"> Software Development </MenuItem>
                      <MenuItem value="Testing"> Testing </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="recruitment-phase-select-label">Recruitment Phase</InputLabel>
                    <Select
                      labelId="recruitment-phase-select-label"
                      id="recruitment-phase-select"
                      label="Recruitment Phase"
                      value={recruitmentPhase}
                      onChange={(event) => setRecruitmentPhase(event.target.value)}
                    >
                      <MenuItem value={"Applied"}>Applied</MenuItem>
                      <MenuItem value={"Interviewed"}>Interviewed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs sm={6}>
                  <TextField
                    id="past-ac-result-input"
                    label="Past AC Result"
                    autoComplete="past-ac-result"
                    fullWidth
                    value={pastACResult}
                    onChange={(event) => setPastACResult(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    onClick={handleSubmit}>
                    Update
                  </Button>
                </Grid>
                <Grid item xs sm={12}>
                  <Button
                    variant="contained"
                    component="label"
                    color="secondary"
                    fullWidth
                    onClick={goBack}>
                    Back
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Container >
      </div >
    </div >
  )
}

export default UpdateCandidate;
