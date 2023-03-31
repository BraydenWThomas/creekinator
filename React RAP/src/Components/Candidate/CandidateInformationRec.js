// React
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

// Components
import TextArea from '../Extra/TextArea';

// Material UI
import { Backdrop, Container, Divider, Fade, Grid, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

const CandidateInformationRec = ({ readModalOpen, setReadModalOpen, candidateId }) => {
  // Candidate Details
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [degree, setDegree] = useState("");
  const [university, setUniversity] = useState("");

  // Candidate Application Details
  const [appliedStream, setAppliedStream] = useState("");
  const [recruitmentPhase, setRecruitmentPhase] = useState("");
  const [pastACResult, setPastACResult] = useState("");

  // To Link to specific candidate
  const [candidate, setCandidate] = useState([]);

  // Read status of Text Fields / Form validation
  const [readOnly, setReadOnly] = useState(true);
  const [emptyError, setEmptyError] = useState(false);

  // Fetch specific candidate
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/candidate/" + candidateId, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCandidate(data);
      })
      .catch((error) => console.log("error", error));
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
  }, [candidate]);

  const pageTitle = candidate.first_name + " " + candidate.last_name + "'s " + "Profile";

  const handleReadModalClose = () => {
    setReadModalOpen(false);
    setReadOnly(true);

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
  };

  const style = {
    editModal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: 800,
      bgcolor: "background.paper",
      border: "2px solid #000",
      borderRadius: "15px",
      boxShadow: 24,
      p: 4,
    },
  };

  // Handle update
  const handleSubmit = () => {
    const body = JSON.stringify({
      id: candidate.id,
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
      past_ac_result: pastACResult,
    });

    const requestOptions = {
      method: "PUT",
      body: body,
      redirect: "follow",
      headers: { "content-type": "application/json" },
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

      handleReadModalClose();
      window.location.reload();
    }
  };

  return (
    <Modal
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
      open={readModalOpen}
      onClose={handleReadModalClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={readModalOpen}>
        <Box sx={style.editModal}>
          <Container component="main">
            <div className="header" style={{ display: "flex" }}>
              <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>
                {pageTitle}
              </Typography>
            </div>
            <Box
              sx={{
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
              }}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <div className="details">
                <Typography component="h2" variant="h4" mb={2}>
                  {" "}
                  Details{" "}
                </Typography>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    <TextArea
                      isTitle={true}
                      label="Title"
                      textType={title}
                      canEdit={readOnly}
                      onChange={setTitle} />
                  </Grid>
                  <Grid item xs={12} sm={3.5}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="First Name"
                      textType={firstName}
                      canEdit={readOnly}
                      onChange={setFirstName} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextArea
                      label="Middle Name"
                      textType={middleName}
                      canEdit={readOnly}
                      onChange={setMiddleName} />
                  </Grid>
                  <Grid item xs={12} sm={3.5}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Last Name"
                      textType={lastName}
                      canEdit={readOnly}
                      onChange={setLastName} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Mobile Number"
                      textType={mobilePhone}
                      canEdit={readOnly}
                      onChange={setMobilePhone} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Email"
                      textType={email}
                      canEdit={readOnly}
                      onChange={setEmail} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextArea
                      isDob={true}
                      label="D.O.B"
                      textType={dob}
                      canEdit={readOnly}
                      onChange={setDob} />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Address"
                      textType={address}
                      canEdit={readOnly}
                      onChange={setAddress} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Graduation Year"
                      textType={gradYear}
                      canEdit={readOnly}
                      onChange={setGradYear} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="Degree"
                      textType={degree}
                      canEdit={readOnly}
                      onChange={setDegree} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextArea
                      error={emptyError}
                      helperText={"Required field"}
                      label="University"
                      textType={university}
                      canEdit={readOnly}
                      onChange={setUniversity} />
                  </Grid>
                </Grid>
              </div>

              <Divider sx={{ mt: 2, mb: 2 }} />

              <div className="application-details">
                <Typography component="h2" variant="h4" mb={2}>
                  {" "} Application Details {" "}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button variant="outlined" component="label" fullWidth>
                      View Resume
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <TextArea
                      isStream={true}
                      label="Applied Stream"
                      textType={appliedStream}
                      canEdit={readOnly}
                      onChange={setAppliedStream} />
                  </Grid>
                  <Grid item xs sm={6}>
                    <TextArea
                      isRecruitPhase={true}
                      label="Recruitment Phase"
                      textType={recruitmentPhase}
                      canEdit={readOnly}
                      onChange={setRecruitmentPhase} />
                  </Grid>
                  <Grid item xs sm={6}>
                    <TextArea
                      label="Past AC Result"
                      textType={pastACResult}
                      canEdit={readOnly}
                      onChange={setPastACResult} />
                  </Grid>
                  <Grid item xs sm={12}>
                    {readOnly ? (
                      <Button
                        onClick={() => setReadOnly(false)}
                        variant="contained"
                        component="label"
                        fullWidth
                        style={{ marginBottom: "16px" }}>
                        Update
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        style={{ marginBottom: "16px" }}
                        onClick={handleSubmit}>
                        Save
                      </Button>
                    )}
                    <Grid item xs sm={12}>
                      <Button
                        variant="contained"
                        component="label"
                        color="secondary"
                        fullWidth
                        onClick={handleReadModalClose}>
                        Close
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CandidateInformationRec;
