// React
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Components
import NavBar from "../NavBar";

// Material UI
import { Divider, TextField } from "@mui/material";

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

  // Handle update
  const handleSubmit = (id) => {
    const body =
      JSON.stringify({
        id: id,
        title: title,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        mobile_number: mobilePhone,
        email: email,
        date_of_birth: dob,
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

  const pageTitle = candidate.first_name + " " + candidate.last_name + "'s " + "Profile"
  
  return (
    <div className="update-candidate">
      <NavBar />
      <div className="content" style={{ float: 'left', width: '80%', backgroundColor: "#f2f2f2" }}>
        <div className="header" style={{ display: "flex" }}>
          <h1 style={{ flex: 1, margin: '1%' }}> {pageTitle} </h1>
          <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "2%" }}>
            <NotificationsIcon fontSize="large" />
            <Avatar src="/broken-image.jpg" />
          </div>
        </div>
        <Divider variant='middle' />
        <div className="details">
          <h2 style={{ margin: '1%' }}>Details</h2>
          <div className="personal-details-row">
            <FormControl sx={{ m: 2, minWidth: 80 }}>
              <InputLabel id="title-select-label">Title</InputLabel>
              <Select
                labelId="title-select-label"
                id="title-select"
                label="Title"
                value={candidate.title ?? " "}
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
              id="outlined-first-name-input"
              label="First Name"
              type="text"
              autoComplete="current-first-name"
              sx={{ m: 2 }}
              value={candidate.first_name ?? " "}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
              id="outlined-middle-name-input"
              label="Middle Name"
              type="text"
              autoComplete="current-middle-name"
              sx={{ m: 2 }}
              value={candidate.middle_name ?? " "}
              onChange={(event) => setMiddleName(event.target.value)}
            />
            <TextField
              id="outlined-last-name-input"
              label="Last Name"
              type="text"
              autoComplete="current-last-name"
              sx={{ m: 2 }}
              value={candidate.last_name ?? " "}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="contact-details-row">
            <TextField
              id="outlined-mobile-input"
              label="Mobile Number"
              type="number"
              autoComplete="current-mobile"
              sx={{ m: 2 }}
              value={candidate.mobile_number ?? " "}
              onChange={(event) => setMobilePhone(event.target.value)}
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              type="text"
              autoComplete="current-email"
              sx={{ m: 2 }}
              value={candidate.email ?? " "}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="contact-details-row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                format="DD/MM/YYYY"
                label="D.O.B"
                sx={{ m: 2 }} 
                // value={candidate.date_of_birth ?? " "}
                />
            </LocalizationProvider>
            <TextField
              id="outlined-address-input"
              label="Address"
              type="text"
              autoComplete="current-address"
              sx={{ m: 2 }}
              value={candidate.address ?? " "}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div className="contact-details-row">
            <TextField
              id="outlined-year-input"
              label="Graduation Year"
              type="number"
              autoComplete="current-year"
              sx={{ m: 2 }}
              value={candidate.graduation_year ?? " "}
              onChange={(event) => setGradYear(event.target.value)}
            />
            <TextField
              id="outlined-degree-input"
              label="Degree"
              type="text"
              autoComplete="current-degree"
              sx={{ m: 2 }}
              value={candidate.degree ?? " "}
              onChange={(event) => setDegree(event.target.value)}
            />
            <TextField
              id="outlined-university-input"
              label="University"
              type="text"
              autoComplete="current-university"
              sx={{ m: 2 }}
              value={candidate.university ?? " "}
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
            <FormControl sx={{ m: 2, minWidth: 450 }}>
              <InputLabel id="applied-stream-select-label">Applied Stream</InputLabel>
              <Select
                labelId="applied-stream-select-label"
                id="applied-stream-select"
                label="Applied Stream"
                value={candidate.applied_stream ?? " "}
                onChange={(event) => setAppliedStream(event.target.value)}
              >
                <MenuItem value={"Software Development"}>Software Development</MenuItem>
                <MenuItem value={"Technical Analyst"}>Technical Analyst</MenuItem>
                <MenuItem value={"Business Analytics"}>Business Analytics</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 450 }}>
              <InputLabel id="recruitment-phase-select-label">Recruitment Phase</InputLabel>
              <Select
                labelId="recruitment-phase-select-label"
                id="recruitment-phase-select"
                label="Recruitment Phase"
                value={candidate.recruit_phase ?? " "}
                onChange={(event) => setRecruitmentPhase(event.target.value)}
              >
                <MenuItem value={"Applied"}>Applied</MenuItem>
                <MenuItem value={"Interviewed"}>Interviewed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="past-ac-result-input"
              label="Pase AC Result"
              type="number"
              autoComplete="past-ac-result"
              sx={{ m: 2 }}
              value={candidate.past_ac_result ?? " "}
              onChange={(event) => setPastACResult(event.target.value)}
            />
          </div>
          <div className="update-button-row" style={{ float: 'right' }} >
            <Button 
              variant="contained" 
              component="label" 
              sx={{ m: 5 }} 
              onClick={() => handleSubmit(candidate.id)}>
                Update
            </Button>
            <a href="/recruiter">
              <Button 
                variant="contained" 
                component="label" 
                sx={{ m: 5 }} >
                  Back
              </Button>
            </a> 
          </div>
        </div>

      </div>
    </div>
  )
}
export default UpdateCandidate;