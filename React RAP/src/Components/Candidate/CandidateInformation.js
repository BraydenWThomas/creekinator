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

  const pageTitle = candidate.first_name + " " + candidate.last_name + " " + "Profile"
  
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
              label={candidate.title}
              type="text"
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-first-name-input"
              label={candidate.first_name}
              type="text"
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-middle-name-input"
              label={candidate.middle_name}
              type="text"
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-last-name-input"
              label={candidate.last_name}
              type="text"
              sx={{ m: 2 }} />
          </div>
          <div className="contact-details-row">
            <TextField
              disabled
              id="outlined-mobile-input"
              label={candidate.mobile_number}
              type="number"
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-email-input"
              label={candidate.email}
              type="text"
              sx={{ m: 2 }} />
          </div>
          <div className="contact-details-row">
            <TextField
              disabled
              id="outlined-date-input"
              label={candidate.date_of_birth}
              type="text"
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-address-input"
              label={candidate.address}
              type="text"
              sx={{ m: 2, minWidth: 500 }} />
          </div>
          <div className="contact-details-row">
            <TextField
              disabled
              id="outlined-year-input"
              label={candidate.graduation_year}
              type="number"
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-degree-input"
              label={candidate.degree}
              type="text"
              sx={{ m: 2 }} />
            <TextField
              disabled
              id="outlined-university-input"
              label={candidate.university}
              type="text"
              sx={{ m: 2 }} />
          </div>
        </div>
        <div className="application-details">
          <div className="application-details-header"></div>
          <Divider style={{ paddingTop: '2%' }} />
          <h2 style={{ margin: '1%' }}>Application Details</h2>
          <div className="resume-row">
          </div>
          <div className="stream-details-row">
            <TextField
              disabled
              id="applied-stream-select"
              label={candidate.applied_stream}
              type="text"
              sx={{ m: 2 }} />
            {/* <FormControl required sx={{ m: 2, minWidth: 450 }}>
                            <InputLabel id="recruitment-phase-select-label">Recruitment Phase</InputLabel>
                            <Select
                                labelId="recruitment-phase-select-label"
                                id="recruitment-phase-select"
                                value={recruitmentPhase}
                                label="Recruitment Phase"
                                onChange={(event) => setRecruitmentPhase(event.target.value)}
                            >
                                <MenuItem value={"Applied"}>Applied</MenuItem>
                                <MenuItem value={"Interviewed"}>Invterviewed</MenuItem>
                            </Select>
                        </FormControl> */}
            <TextField
              disabled
              id="recruitment-phase-select-label"
              label={candidate.recruit_phase}
              type="text"
              sx={{ m: 2 }}
              onChange={(event) => setRecruitmentPhase(event.target.value)} />

            <TextField
              disabled
              id="past-ac-result-input"
              label={candidate.past_ac_result}
              type="text"
              sx={{ m: 2 }}
              onChange={(event) => setPastACResult(event.target.value)} />
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