// React
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

// Components
import TextArea from '../Extra/TextArea';

// Material UI
import { Backdrop, Box, Divider, Fade, Grid, Modal, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { Container } from "@mui/system";


const UpdateCandidate = ({ updateModalOpen, setUpdateModalOpen, candidateId }) => {
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
  const [candidate, setCandidate] = useState([]);
  const [getName, setGetName] = useState([])

  // Form Validation
  const [emptyError, setEmptyError] = useState(false);

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

    if (firstName.trim() === "") {
      setEmptyError(true)
    } else if (lastName.trim() === "") {
      setEmptyError(true)
    } else {
      fetch("http://localhost:8080/api/candidate", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      handleUpdateModalClose();
      window.location.reload();
    }
  }

  var pageTitle = getName.first_name + " " + getName.last_name + "'s " + "Profile"

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);

    // Reset Candidate Details
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

    // Reset Application Details
    setAppliedStream(candidate.applied_stream);
    setRecruitmentPhase(candidate.recruit_phase);
    setPastACResult(candidate.past_ac_result);
  }


  return (
    <Modal
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
      open={updateModalOpen}
      onClose={handleUpdateModalClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={updateModalOpen}>
        <Box sx={style.editModal}>
          <Container component="main">
            <div className="header" style={{ display: "flex" }}>
              <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>{pageTitle}</Typography>
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
                  <Grid item xs sm={6}>
                    <TextArea
                      label="Past AC Result"
                      textType={pastACResult}
                      onChange={setPastACResult} />
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
                      onClick={handleUpdateModalClose}>
                      Back
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

export default UpdateCandidate;
