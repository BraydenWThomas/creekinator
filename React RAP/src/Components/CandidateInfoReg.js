// React + css
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
// Webpage components
import NavBar from "./NavBar";

// Material UI
import { Box, Container, Divider, Grid, Menu, TextField, Typography } from "@mui/material";
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

const CandidateInfoReg = () => {
  // Details
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [role, setRole] = useState('');
  // Application Details
  const [appliedStream, setAppliedStream] = useState('');
  const [recruitmentPhase, setRecruitmentPhase] = useState('');
  const [pastACResult, setPastACResult] = useState('');

  // Go back to previous page
  const navigate = useNavigate();

  useEffect(() => {
    const loginDetail = JSON.parse(localStorage.getItem('loginInfo'))
    setEmail(loginDetail.email)
    setUsername(loginDetail.username)
    setPassword(loginDetail.password)
    setRole(loginDetail.role)
  }, []);

  const goBack = () => {
    navigate(-1);
  }

  const handleSubmit = () => {
    //goBack();

    setTitle('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setMobilePhone('');
    setDob('');
    setAddress('');
    setGradYear('');
    setDegree('');
    setUniversity('');
    setAppliedStream('');
    setRecruitmentPhase('');
    setPastACResult('');
    setFullname('');

    const link = "http://localhost:8080/api/auth/signup?candidateTitle=" + title +
      "&candidateFirst_name=" + firstName + "&candidateMiddle_name=" + middleName + "&candidateLast_name=" + lastName +
      "&candidateMobile_number=" + mobilePhone + "&candidateEmail=" + email + "&candidate_date_of_birth=" + dob.format("YYYY-MM-DD") +
      "&candidateAddress=" + address + "&candidate_graduation_year=" + gradYear + "&candidateDegree=" + degree +
      "&candidateUniversity=" + university

    const body =
      JSON.stringify(
        {
          username: username,
          email: email,
          password: password,
          role: role,
          name: firstName + middleName + lastName
        })

    const requestOptions = {
      method: 'POST',
      body: body,
      redirect: 'follow',
      headers: { 'content-type': 'application/json' }
    };

    fetch(link, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="create-candidate">
      <div className="content" style={{ float: 'left', width: '100%' }}>
        <Container component="main">
          <div className="header" style={{ display: "flex" }}>
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}> Create My Details </Typography>
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
                  <FormControl required fullWidth >
                    <InputLabel id="title-select-label">Title</InputLabel>
                    <Select
                      required
                      labelId="title-select-label"
                      id="title-select"
                      value={title}
                      label="Title"
                      onChange={(event) => setTitle(event.target.value)}
                    >
                      <MenuItem value={"Mr"}>Mr</MenuItem>
                      <MenuItem value={"Ms"}>Ms</MenuItem>
                      <MenuItem value={"Miss"}>Miss</MenuItem>
                      <MenuItem value={"Mrs"}>Mrs</MenuItem>
                      <MenuItem value={"Dr"}>Dr</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    id="outlined-first-name-input"
                    label="First Name"
                    type="text"
                    autoComplete="current-first-name"
                    value={firstName}
                    fullWidth
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="outlined-middle-name-input"
                    label="Middle Name"
                    type="text"
                    autoComplete="current-middle-name"
                    value={middleName}
                    fullWidth
                    onChange={(event) => setMiddleName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="outlined-last-name-input"
                    label="Last Name"
                    type="text"
                    autoComplete="current-last-name"
                    value={lastName}
                    fullWidth
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    required
                    id="outlined-mobile-input"
                    label="Mobile Phone"
                    type="text"
                    autoComplete="current-mobile"
                    value={mobilePhone}
                    fullWidth
                    onChange={(event) => setMobilePhone(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="D.O.B *"
                      format="DD/MM/YYYY"
                      value={dob}
                      onChange={(newDob) => setDob(newDob)}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    required
                    id="outlined-address-input"
                    label="Address"
                    type="text"
                    autoComplete="current-address"
                    value={address}
                    fullWidth
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="outlined-year-input"
                    label="Graduation Year"
                    type="text"
                    autoComplete="current-year"
                    value={gradYear}
                    fullWidth
                    onChange={(event) => setGradYear(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="outlined-degree-input"
                    label="Degree"
                    type="text"
                    autoComplete="current-degree"
                    value={degree}
                    fullWidth
                    onChange={(event) => setDegree(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="outlined-university-input"
                    label="University"
                    type="text"
                    autoComplete="current-university"
                    value={university}
                    fullWidth
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

                <Grid item xs sm={12}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    onClick={handleSubmit}
                    style={{ marginBottom: "16px" }}>
                    Create
                  </Button>

                  <Button
                    variant="contained"
                    component="label"
                    color="secondary"
                    fullWidth
                    onClick={goBack}>
                    Cancel
                  </Button>

                </Grid>
              </Grid>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  )
}
export default CandidateInfoReg;
