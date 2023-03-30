// Components
import NavBar from '../NavBar';

// React
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

// Material UI
import {
  Divider,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,
  IconButton,
  Box,
  FormGroup,
  Checkbox,
  Typography,
  Avatar,
  Grid,
  Modal
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { Container } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const UpdateAC = () => {
  


  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState(dayjs().set('hour', 9).set('minute', 0).startOf('minute'));
  const [timeEnd, setTimeEnd] = useState(dayjs().set('hour', 17).set('minute', 0).startOf('minute'));

  // Link to specific ac
  const { acId } = useParams();
 

// AC Details
const [title, setTitle] = useState('');
useEffect(() => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  Promise.all([
    fetch("http://localhost:8080/api/ac/" + acId, requestOptions),
    fetch("http://localhost:8080/api/auth/user", requestOptions)
  ]).then((responses => {
    responses[0].json()
      .then(data => {
        setTitle(data.title)
        setDate(dayjs(data.date))
        setTimeStart(dayjs().set('hour', parseInt(data.start_time.substring(0,2))).set('minute', parseInt(data.start_time.substring(3,5))).startOf('minute'))
        setTimeEnd(dayjs().set('hour', parseInt(data.finish_time.substring(0,2))).set('minute', parseInt(data.finish_time.substring(3,5))).startOf('minute'))
      })
    responses[1].json()
      .then(result => setCurrentUser(result[localStorage.getItem('userId') - 1].recruiter.id))
  })).catch(error => console.log('error', error));
}, []);
                                                                                          
  //handle modal
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  // Filter
  const [stream, setStream] = useState('');

  // Time details
  const startDay = dayjs().set('hour', 9).startOf('hour')
  const endDay = dayjs().set('hour', 17).startOf('hour')
  //GET selected users
  const [currentCandidates, setCurrentCandidates] = useState([]);
  const [currentInterviewers, setCurrentInterviewers] = useState([]);
  const [currentRecruiters, setCurrentRecruiters] = useState([]);
  // GET requests
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [withACMaker, setWithACMaker] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);
 
  // Checkbox states
  const [isCheckedInterviewer, setIsCheckedInterviewer] = useState([]);
  const [isCheckedCandidates, setIsCheckedCandidates] = useState([]);
  const [isCheckedRecruiters, setIsCheckedRecruiters] = useState([]);
  // Go back to previous page
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  // Fetch all candidates, interviewers and recruiters
  useEffect(() => {

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };



    Promise.all([
      fetch("http://localhost:8080/api/candidate", requestOptions),
      fetch("http://localhost:8080/api/interviewer", requestOptions),
      fetch("http://localhost:8080/api/recruiter", requestOptions)
    ]).then((responses => {
      console.log(responses)
      responses[0].json()
        .then(data => { setCandidates(data) })
      responses[1].json()
        .then(data => { setInterviewers(data) })
      responses[2].json()
        .then(data => { setWithACMaker(data) })
    })).catch(error => console.log('error', error));




  }, [currentUser]);

  // Fetch all candidates, interviewers and recruiters
  useEffect(() => {

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
   
    fetch("http://localhost:8080/api/ac/" + acId + "/detailed", requestOptions)
      .then(response => response.json())
      .then(result => {
        setCurrentRecruiters(result.recruiters);
        setCurrentCandidates(result.candidates);
        setCurrentInterviewers(result.interviewers)

      })
      .catch(error => console.log('error', error));

  

  }, [recruiters]);


  
  const existingUser = (base, current) => {
    var tempChecked = base.slice().fill(false)
    for (var i = 0; i < base.length ; i++){
      for (var j = 0; j < current.length ; j++){
          if (base[i].id == current[j].id){
            tempChecked[i] = true
          }
      }
    }
    return tempChecked
  }
  // Handle updating interviewers
  useEffect(() => {
  
    setIsCheckedInterviewer( existingUser(interviewers, currentInterviewers));
  }, [currentInterviewers]);

  const toggleCheckedInterviewer = (index) => {
    setIsCheckedInterviewer(isCheckedInterviewer.map((v, i) => (i === index ? !v : v)));
  };

  // Handle updating candidates
  useEffect(() => {
  
    setIsCheckedCandidates(existingUser(candidates, currentCandidates));
  }, [currentCandidates]);

  const toggleCheckedCandidates = (index) => {
    setIsCheckedCandidates(isCheckedCandidates.map((v, i) => (i === index ? !v : v)));
  };

  // Handle updating recruiter
  useEffect(() => {
    //do not show AC creator as removable

    setRecruiters(withACMaker.filter((item) => item.id !== currentUser))

  }, [withACMaker]);

  useEffect(() => {

    setIsCheckedRecruiters(existingUser(recruiters, currentRecruiters));
  }, [recruiters]);

  const toggleCheckedRecruiters = (index) => {
    setIsCheckedRecruiters(isCheckedRecruiters.map((v, i) => (i === index ? !v : v)));
  };
  
  // Handle creating AC
  const handleSubmit = () => {
    //console.log(ac)
    var salesIntCount = 0;
    var techIntCount = 0;
    for (var i = 0; i < interviewers.length; i++) {


      if (interviewers[i].tech == false && isCheckedInterviewer[i] == true) {
        salesIntCount += 1;
      } else if ((interviewers[i].tech == true && isCheckedInterviewer[i] == true)) {
        techIntCount += 1;
      }

    }

    if (date == '' || !isCheckedInterviewer.includes(true) || !isCheckedCandidates.includes(true) || salesIntCount < 1 || techIntCount < 1) {
      setOpen(true)

    }

    else {
      goBack()

      // Get attending interviewers
      const interviewerIds = [];
      for (var i = 0; i < isCheckedInterviewer.length; i++) {
        if (isCheckedInterviewer[i]) {
          interviewerIds.push(interviewers[i].id);
        }
      }
      const interviewerString = interviewerIds.join(",");

      // Get attending candidates
      const candidateIds = [];
      for (var j = 0; j < isCheckedCandidates.length; j++) {
        if (isCheckedCandidates[j]) {
          candidateIds.push(candidates[j].id);
        }
      }
      const candidateString = candidateIds.join(",");

      // Get attending recruiters
      const recruiterIds = [];
      recruiterIds.push(currentUser)
      for (var j = 0; j < isCheckedRecruiters.length; j++) {
        if (isCheckedRecruiters[j]) {
          recruiterIds.push(recruiters[j].id);
        }
      }
      const recruiterString = recruiterIds.join(",");

     
      // Update
      const body =
        JSON.stringify({
          id: acId,
          title: title,
          date: date.format('YYYY-MM-DD'),
          start_time: timeStart.format('HH:mm:ss'),
          finish_time: timeEnd.format('HH:mm:ss')
        });

      const requestOptions = {
        method: 'PUT',
        body: body,
        redirect: 'follow',
        headers: { 'content-type': 'application/json' }
      };
      fetch("http://localhost:8080/api/ac", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      fetch("http://localhost:8080/api/ac/" + acId + "/updateLinkedInfo?interviewerIds=" + interviewerString +
      "&recruiterIds=" + recruiterString + "&candidateIds=" + candidateString, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
     
     
    }



  };

  return (
    <div>
      <NavBar />

      <div className="content" style={{ float: 'left', width: '80%' }}>
        <Container component="main">
          <div className="header" style={{ display: "flex" }}>
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>Update {title}</Typography>
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
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Missed Areas
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Please fill all fields
                </Typography>
              </Box>
            </Modal>
            <div className="ac-details">
              <Typography component="h2" variant="h4" mb={2}> Time </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="title-input"
                    label="Title"
                    type="text"
                    autoComplete="current-title"
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      label="Date"
                      disablePast
                      required
                      format="DD/MM/YYYY"
                      value={date}
                      onChange={(newDate) => setDate(newDate)} />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      sx={{ width: '100%' }}
                      label="Start Time"
                      format="hh:mm a"
                      minTime={startDay}
                      maxTime={endDay}
                      value={timeStart}
                      onChange={(newTime) => setTimeStart(newTime)} />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      sx={{ width: '100%' }}
                      label="End Time"
                      format="hh:mm a"
                      minTime={startDay}
                      maxTime={endDay}
                      value={timeEnd}
                      onChange={(newTime) => setTimeEnd(newTime)} />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </div>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <div className="Interviewers">
              <Typography component="h2" variant="h4" mb={2}> Interviewers </Typography>
              <Grid container spacing={2}>
                <Grid item xs sm={6}>
                  <div className="sales-packs">
                    <Typography component="h2" variant="h5"> Sales Interviewer </Typography>
                    <Box sx={{ maxHeight: 170, overflow: 'auto', backgroundColor: 'white', paddingLeft: 2 }}>
                      <FormGroup>
                        {isCheckedInterviewer.map((checked, index) => (
                          (interviewers[index].tech === false) &&
                          <FormControlLabel
                            key={interviewers[index].id}
                            control={
                              <Checkbox
                                key={index}
                                checked={checked}
                                onClick={() => toggleCheckedInterviewer(index)}
                              />}
                            label={interviewers[index].name}
                          />
                        ))}
                      </FormGroup>
                    </Box>
                  </div>
                </Grid>
                <Grid item xs sm={6}>
                  <div className="technical-packs">
                    <Typography component="h2" variant="h5"> Technical Interviewer </Typography>
                    <Box sx={{ maxHeight: 170, overflow: 'auto', backgroundColor: 'white', paddingLeft: 2 }}>
                      <FormGroup>
                        {isCheckedInterviewer.map((checked, index) => (
                          (interviewers[index].tech === true) &&
                          <FormControlLabel
                            key={interviewers[index].id}
                            control={
                              <Checkbox
                                key={index}
                                checked={checked}
                                onClick={() => toggleCheckedInterviewer(index)}
                              />}
                            label={interviewers[index].name}
                          />
                        ))}
                      </FormGroup>
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </div>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <div className="candidates">
              <div style={{ display: 'flex', marginBottom: '2%' }}>
                <Typography component="h2" variant="h4" sx={{ flex: 1 }}> Candidates </Typography>
                <IconButton aria-label="alpha-sort">
                  <SortByAlphaIcon fontSize='medium' />
                </IconButton>
                <FormControl sx={{ float: 'right', minWidth: '25%' }} size="small">
                  <InputLabel id="stream-select-label"> Stream </InputLabel>
                  <Select
                    id="stream-select"
                    label="Stream"
                    required
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}>
                    <MenuItem value="Business Analyst"> Business Analyst </MenuItem>
                    <MenuItem value="Business Intelligence"> Business Intelligence </MenuItem>
                    <MenuItem value="Cloud (AWS)"> Cloud (AWS) </MenuItem>
                    <MenuItem value="Technical Analyst"> Technical Analyst </MenuItem>
                    <MenuItem value="Software Development"> Software Development </MenuItem>
                    <MenuItem value="Testing"> Testing </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Box>
                <FormGroup sx={{ maxHeight: 200, overflow: 'auto', width: '100%' }}>
                  {isCheckedCandidates.map((checked, index) => (
                    <FormControlLabel
                      key={candidates[index].id}
                      control={
                        <Checkbox
                          key={index}
                          checked={checked}
                          onClick={() => toggleCheckedCandidates(index)}
                        />}
                      label={candidates[index].first_name + " " + candidates[index].middle_name + " " + candidates[index].last_name} />
                  ))}
                </FormGroup>
              </Box>
            </div>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <div className="recruiter">
              <div style={{ display: 'flex', marginBottom: '2%' }}>
                <Typography component="h2" variant="h4" sx={{ flex: 1 }}> Recruiter </Typography>


              </div>

              <Box>
                <FormGroup sx={{ maxHeight: 200, overflow: 'auto', width: '100%' }}>
                  {isCheckedRecruiters.map((checked, index) => (
                    <FormControlLabel
                      key={recruiters[index].id}
                      control={
                        <Checkbox
                          key={index}
                          checked={checked}
                          onClick={() => toggleCheckedRecruiters(index)}
                        />}
                      label={recruiters[index].name} />
                  ))}
                </FormGroup>
              </Box>
            </div>





            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs sm={12}>
                <p style={{ float: 'right' }}>*Please fill in every field, Recruiter not mandatory</p> <br />
                <Button variant="contained" fullWidth onClick={(e) => handleSubmit(e.target.value)}>
                  Update
                </Button>
              </Grid>
              <Grid item xs sm={12}>
                <Link to={"/recruiter"}>
                  <Button variant="contained" color='secondary' fullWidth> Cancel </Button>
                </Link>
              </Grid>


            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  )
}

export default UpdateAC;