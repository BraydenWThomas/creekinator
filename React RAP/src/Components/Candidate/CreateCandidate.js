import { Box, Container, Divider, Grid, Menu, TextField, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "../NavBar";
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
  // const [dob, setDob] = useState(new Date());
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');

  // Application Details
  const [appliedStream, setAppliedStream] = useState('');
  const [recruitmentPhase, setRecruitmentPhase] = useState('');
  const [pastACResult, setPastACResult] = useState('');

  // const [candidates, setCandidates] = useState();

  const handleSubmit = () => {
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
        date_of_birth: new Date().toISOString(),
        address: address,
        graduation_year: new Date().toISOString(),
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

    fetch("http://localhost:8080/api/candidate", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
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
                    type="number"
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
                    // value={dob}
                    // onChange={(event) => setDob(event.target.value)}
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
                    onChange={(newDate) => setAddress(newDate)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="outlined-year-input"
                    label="Graduation Year"
                    type="number"
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
                </Grid>
                <Grid item xs sm={4}>
                  <TextField
                    required
                    id="past-ac-result-input"
                    label="Past AC Result"
                    type="number"
                    autoComplete="past-ac-result"
                    value={pastACResult}
                    fullWidth
                    onChange={(event) => setPastACResult(event.target.value)}
                  />
                </Grid>
                <Grid item xs sm={12}>
                  <Button variant="contained" component="label" onClick={handleSubmit}>Create</Button>
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
