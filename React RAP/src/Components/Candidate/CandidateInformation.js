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


const CandidateInformation = () => {
  // Candidate Details
  const [title, setTitle] = useState('');
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

  const pageTitle = candidate.first_name + " " + candidate.last_name + "'s " + "Profile"
  
  return (
    <div className="candidate-info">
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
          <h2 style={{ margin: '1%' }}> Details </h2>
          <div className="personal-details-row">
            <TextField
              disabled
              id="title_select"
              label="Title"
              type="text"
              value={candidate.title ?? ""}
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-first-name-input"
              label="First Name"
              type="text"
              value={candidate.first_name ?? ""}
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-middle-name-input"
              label="Middle Name"
              type="text"
              value={candidate.middle_name ?? ""}
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-last-name-input"
              label="Last Name"
              type="text"
              value={candidate.last_name ?? ""}
              sx={{ m: 2 }} />
          </div>
          <div className="contact-details-row">
            <TextField
              disabled
              id="outlined-mobile-input"
              label="Mobile Phone"
              type="number"
              value={candidate.mobile_number ?? ""}
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-email-input"
              label="Email"
              type="text"
              value={candidate.email ?? ""}
              sx={{ m: 2 }} />
          </div>
          <div className="contact-details-row">
            <TextField
              disabled
              id="outlined-date-input"
              label="D.O.B"
              type="text"
              value={candidate.date_of_birth ?? ""}
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-address-input"
              label="Address"
              type="text"
              value={candidate.address ?? ""}
              sx={{ m: 2, minWidth: 500 }} />
          </div>
          <div className="contact-details-row">
            <TextField
              disabled
              id="outlined-year-input"
              label="Graduation Year"
              type="number"
              value={candidate.graduation_year ?? ""}
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-degree-input"
              label="Degree"
              type="text"
              value={candidate.degree ?? ""}
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-university-input"
              label="University"
              type="text"
              value={candidate.university ?? ""}
              sx={{ m: 2 }} />
          </div>
        </div>
        <div className="application-details">
          <div className="application-details-header"></div>
          <Divider style={{ paddingTop: '2%' }} />
          <h2 style={{ margin: '1%' }}> Application Details </h2>
          <div className="resume-row">
          </div>
          <div className="stream-details-row">
            <TextField
              disabled
              id="applied-stream-select"
              label="Applied Stream"
              type="text"
              value={candidate.applied_stream ?? ""}
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="recruitment-phase-select-label"
              label="Recruitment Phase"
              type="text"
              value={candidate.recruit_phase ?? ""}
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="past-ac-result-input"
              label="Past AC Result"
              type="text"
              value={candidate.past_ac_result ?? ""}
              sx={{ m: 2 }} />
          </div>
          <div className="create-button-row">
            <a href="/recruiter">
              <Button 
                variant="contained" 
                component="label" 
                sx={{ m: 5 }} 
                style={{ float: 'right' }}>
                Back
              </Button>           
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateInformation;

  // const fetchCandidate = async () => {
    //   const { candidate } = await request (
    //     "http://localhost:8080/api/candidate/",
    //     `
    //     {
    //       candidate(where: {candidateName: "${candidateName}"}) {
    //         title
    //         first_name
    //         middle_name
    //         last_name
    //         mobile_number
    //         email
    //         date_of_birth
    //         address
    //         graduation_year
    //         degree
    //         university
    //         applied_stream
    //         recruit_phase
    //         past_ac_result
    //       }
    //     }
    //     `
    //   );
    //   setCandidate(candidate);
    // }
