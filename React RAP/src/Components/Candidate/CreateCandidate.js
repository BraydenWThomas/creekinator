import { Divider, TextField } from "@mui/material";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const FDMtheme = createTheme({
  palette: {
    primary: {
      main: '#6f00ff',
    },
    secondary: blue,
  },
});

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
        graduation_year: gradYear,
        degree: degree,
        university: university,
        resume: "resume-link",
        applied_stream: appliedStream,
        recruit_phase: recruitmentPhase,
        past_ac_result: pastACResult
      });

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
      <div className="content" style={{ float: 'left', width: '80%', backgroundColor: "#f2f2f2" }}>
        <div className="header" style={{ display: "flex" }}>
          <h1 style={{ flex: 1, margin: '1%' }}>Create Candidate</h1>
          <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
            <NotificationsIcon fontSize="large" />
            <Avatar src="/broken-image.jpg" />
          </div>
        </div>
        <Divider variant='middle' />
        <div className="details">
          <h2 style={{ margin: '1%' }}>Details</h2>
          <div className="personal-details-row">
            <FormControl required sx={{ m: 2, minWidth: 90 }}>
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
            <TextField
              required
              id="outlined-first-name-input"
              label="First Name"
              type="text"
              autoComplete="current-first-name"
              value={firstName}
              sx={{ m: 2 }}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
              id="outlined-middle-name-input"
              label="Middle Name"
              type="text"
              autoComplete="current-middle-name"
              value={middleName}
              sx={{ m: 2 }}
              onChange={(event) => setMiddleName(event.target.value)}
            />
            <TextField
              required
              id="outlined-last-name-input"
              label="Last Name"
              type="text"
              autoComplete="current-last-name"
              value={lastName}
              sx={{ m: 2 }}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="contact-details-row">
            <TextField
              required
              id="outlined-mobile-input"
              label="Mobile Phone"
              type="number"
              autoComplete="current-mobile"
              value={mobilePhone}
              sx={{ m: 2 }}
              onChange={(event) => setMobilePhone(event.target.value)}
            />
            <TextField
              required
              id="outlined-email-input"
              label="Email"
              type="text"
              autoComplete="current-email"
              value={email}
              sx={{ m: 2 }}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="contact-details-row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="D.O.B *"
                format="DD/MM/YYYY"
                value={dob}
                onChange={(newDob) => setDob(newDob)}
                sx={{ m: 2 }}
              />
            </LocalizationProvider>
            <TextField
              required
              id="outlined-address-input"
              label="Address"
              type="text"
              autoComplete="current-address"
              value={address}
              sx={{ m: 2, minWidth: 500 }}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div className="contact-details-row">
            <TextField
              required
              id="outlined-year-input"
              label="Graduation Year"
              type="number"
              autoComplete="current-year"
              value={gradYear}
              sx={{ m: 2 }}
              onChange={(event) => setGradYear(event.target.value)}
            />
            <TextField
              required
              id="outlined-degree-input"
              label="Degree"
              type="text"
              autoComplete="current-degree"
              value={degree}
              sx={{ m: 2 }}
              onChange={(event) => setDegree(event.target.value)}
            />
            <TextField
              required
              id="outlined-university-input"
              label="University"
              type="text"
              autoComplete="current-university"
              value={university}
              sx={{ m: 2 }}
              onChange={(event) => setUniversity(event.target.value)}
            />
          </div>
        </div>
        <div className="application-details">
          <div className="application-details-header"></div>
          <Divider style={{ paddingTop: '2%' }} />
          <h2 style={{ margin: '1%' }}>Application Details</h2>
          <div className="resume-row">
            <Button variant="outlined" component="label" sx={{ m: 2 }}>
              Upload Resume
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
          <div className="stream-details-row">
            <FormControl required sx={{ m: 2, minWidth: 450 }}>
              <InputLabel id="applied-stream-select-label">Applied Stream</InputLabel>
              <Select
                labelId="applied-stream-select-label"
                id="applied-stream-select"
                value={appliedStream}
                label="Applied Stream"
                onChange={(event) => setAppliedStream(event.target.value)}
              >
                <MenuItem value={"Software Development"}>Software Development</MenuItem>
                <MenuItem value={"Technical Analyst"}>Technical Analyst</MenuItem>
                <MenuItem value={"Business Analytics"}>Business Analytics</MenuItem>
              </Select>
            </FormControl>
            <FormControl required sx={{ m: 2, minWidth: 450 }}>
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
            <TextField
              required
              id="past-ac-result-input"
              label="Past AC Result"
              type="number"
              autoComplete="past-ac-result"
              value={pastACResult}
              sx={{ m: 2 }}
              onChange={(event) => setPastACResult(event.target.value)}
            />
          </div>
          <div className="create-button-row">
            <Button variant="contained" component="label" sx={{ m: 5 }} style={{ float: 'right' }} onClick={handleSubmit}>Create</Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreateCandidate;