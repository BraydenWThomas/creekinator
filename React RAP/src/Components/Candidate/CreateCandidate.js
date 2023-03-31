// React + css
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

// Components
import TextArea from '../Extra/TextArea';

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
  const [noDob, setNoDob] = useState(false);

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
      try {
        fetch("http://localhost:8080/api/candidate", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        handleCreateModalClose();
        window.location.reload();
      } catch (error) {
        setNoDob(false);
        console.log("No DOB given");
      }
    }
  }

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
                    <TextArea
                      isTitle={true}
                      label="Title"
                      textType={title}
                      onChange={setTitle} />
                  </Grid>
                  <Grid item xs={12} sm={3.5}>
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
                  <Grid item xs={12} sm={3.5}>
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
                      error={noDob}
                      helperText={"Required field"}
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
                      onClick={handleCreateModalClose}>
                      Cancel
                    </Button>
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
