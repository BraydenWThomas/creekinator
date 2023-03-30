// React + css
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

// Components
import TextArea from "../Extra/TextArea";

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

const CreateCandidate = () => {
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

  // Application Details
  const [appliedStream, setAppliedStream] = useState('');
  const [recruitmentPhase, setRecruitmentPhase] = useState('');
  const [pastACResult, setPastACResult] = useState('');

  // Form Validation
  const [emptyError, setEmptyError] = useState(false);

  // Go back to previous page
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  const handleSubmit = () => {
    goBack();

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

    const body =
      JSON.stringify({
        title: title,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        mobile_number: mobilePhone,
        email: email,
        date_of_birth: dob.format("YYYY-MM-DD"),
        address: address,
        graduation_year: gradYear,
        degree: degree,
        university: university,
        resume: "resume-link",
        applied_stream: appliedStream,
        recruit_phase: recruitmentPhase,
        past_ac_result: pastACResult
      })

    const requestOptions = {
      method: 'POST',
      body: body,
      redirect: 'follow',
      headers: { 'content-type': 'application/json' }
    };

    if (firstName.trim() === "") {
      setEmptyError(true)
    } else if (lastName.trim() === "") {
      setEmptyError(true)
    } else {
      fetch("http://localhost:8080/api/candidate", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      handleCreateModalClose();
      window.location.reload();
    }
  }

  return (
    <div className="create-candidate">
      <NavBar />
      <div className="content" style={{ float: 'left', width: '80%' }}>
        <Container component="main">
          <div className="header" style={{ display: "flex" }}>
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>Create Candidate</Typography>
            <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
              <NotificationsIcon fontSize="large" />
              <Avatar src="/broken-image.jpg" />
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
                    <TextArea
                      isTitle={true}
                      label="Title"
                      textType={title}
                      onChange={setTitle} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="First Name"
                      textType={firstName}
                      onChange={setFirstName} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextArea
                      label="Middle Name"
                      textType={middleName}
                      onChange={setMiddleName} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Last Name"
                      textType={lastName}
                      onChange={setLastName} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Mobile Number"
                      textType={mobilePhone}
                      onChange={setMobilePhone} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Email"
                      textType={email}
                      onChange={setEmail} />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextArea
                      isDob={true}
                      label="D.O.B"
                      textType={dob}
                      onChange={setDob} />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Address"
                      textType={address}
                      onChange={setAddress} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Graduation Year"
                      textType={gradYear}
                      onChange={setGradYear} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Degree"
                      textType={degree}
                      onChange={setDegree} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="University"
                      textType={university}
                      onChange={setUniversity} />
                  </Grid>
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
                  <Grid item xs={6}>
                    <TextArea
                      isStream={true}
                      label="Applied Stream"
                      textType={appliedStream}
                      onChange={setAppliedStream} />
                  </Grid>
                  <Grid item xs sm={6}>
                    <TextArea
                      isRecruitPhase={true}
                      label="Recruitment Phase"
                      textType={recruitmentPhase}
                      onChange={setRecruitmentPhase} />
                  </Grid>
                  <Grid item xs sm={12}>
                    <Button
                      variant="contained"
                      component="label"
                      color="secondary"
                      fullWidth
                      onClick={goBack}>
                      Cancel
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  )
}
export default CreateCandidate;
