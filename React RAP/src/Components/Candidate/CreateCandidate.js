// React + css
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

<<<<<<< HEAD
=======
// Components
import TextArea from "../Extra/TextArea";

>>>>>>> f10350da1950d32931ee501ea58c5458315569ae
// Material UI
import { Backdrop, Box, Container, Divider, Fade, Grid, Menu, Modal, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CreateCandidate = ({ createModalOpen, setCreateModalOpen }) => {
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

  const handleSubmit = () => {
    setCreateModalOpen(false);

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

<<<<<<< HEAD
  const handleCreateModalClose = () => {
    setCreateModalOpen(false);

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

  return (
    <Modal
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
      open={createModalOpen}
      onClose={handleCreateModalClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={createModalOpen}>
        <Box sx={style.editModal}>
          <Container component="main">
            <div className="header" style={{ display: "flex" }}>
              <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>Create Candidate</Typography>
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
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="outlined-email-input"
                      label="Email"
                      type="text"
                      autoComplete="current-email"
                      value={email}
                      fullWidth
                      onChange={(event) => setEmail(event.target.value)}
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

=======
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

>>>>>>> f10350da1950d32931ee501ea58c5458315569ae
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
<<<<<<< HEAD
                    <FormControl required fullWidth>
                      <InputLabel id="applied-stream-select-label">Applied Stream</InputLabel>
                      <Select
                        labelId="applied-stream-select-label"
                        id="applied-stream-select"
                        value={appliedStream}
                        label="Applied Stream"
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
                    <FormControl required fullWidth>
                      <InputLabel id="recruitment-phase-select-label">Recruitment Phase</InputLabel>
                      <Select
                        labelId="recruitment-phase-select-label"
                        id="recruitment-phase-select"
                        value={recruitmentPhase}
                        label="Recruitment Phase"
                        onChange={(event) => setRecruitmentPhase(event.target.value)}
                      >
                        <MenuItem value={"Applied"}>Applied</MenuItem>
                        <MenuItem value={"Interviewed"}>Interviewed</MenuItem>
                      </Select>
                    </FormControl>
=======
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
>>>>>>> f10350da1950d32931ee501ea58c5458315569ae
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
                    <Link to={"/recruiter"}>
                      <Button
                        variant="contained"
                        component="label"
                        color="secondary"
                        fullWidth
                        onClick={handleCreateModalClose}>
                        Cancel
                      </Button>
                    </Link>
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
export default CreateCandidate;
