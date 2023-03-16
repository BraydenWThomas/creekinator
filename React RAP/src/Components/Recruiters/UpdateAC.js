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
  Typography,
  Avatar,
  Grid
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Container } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';

const UpdateAC = () => {
  // AC Details
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState(dayjs().set('hour', 9).set('minute', 0).startOf('minute'));
  const [timeEnd, setTimeEnd] = useState(dayjs().set('hour', 17).set('minute', 0).startOf('minute'));

  // Time details
  const startDay = dayjs().set('hour', 9).startOf('hour')
  const endDay = dayjs().set('hour', 17).startOf('hour')

  // Link to specific ac
  const { acId } = useParams();
  const [ac, setAc] = useState([]);

  // Go back to previous page
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  // Fetch all candidates + acs
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch("http://localhost:8080/api/ac/" + acId, requestOptions)
      .then(response => response.json())
      .then(data => { setAc(data) })
      .catch(error => console.log('error', error));
  }, [acId])

  // Create new states to update AC details
  useEffect(() => {
    setTitle(ac.title);
    setDate(dayjs(ac.date));
    setTimeStart(dayjs(ac.start_time, "hh:mm:ss"));
    setTimeEnd(dayjs(ac.finish_time, "hh:mm:ss"));
  }, [ac])

  // Update AC
  const handleSubmit = () => {
    // Go back to previous page
    goBack();

    const body =
      JSON.stringify({
        id: ac.id,
        title: title,
        date: date.format('YYYY-MM-DD'),
        start_time: timeStart.format('HH:mm:ss'),
        finish_time: timeEnd.format('HH:mm:ss'),
        coordinatorId: ac.coordinatorId
      });

    const requestOptions = {
      method: 'POST',
      body: body,
      redirect: 'follow',
      headers: { 'content-type': 'application/json' }
    };

    fetch("http://localhost:8080/api/ac", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div>
      <NavBar />

      <div className="content" style={{ float: 'left', width: '80%' }}>
        <Container component="main">
          <div className="header" style={{ display: "flex" }}>
            <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}>Update Assessment Centre Details</Typography>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      label="Date"
                      disablePast
                      format="DD/MM/YYYY"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      sx={{ width: '100%' }}
                      label="Start Time"
                      format="hh:mm a"
                      minTime={startDay}
                      maxTime={timeEnd}
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
                      minTime={timeStart}
                      maxTime={endDay}
                      value={timeEnd}
                      onChange={(newTime) => setTimeEnd(newTime)} />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleSubmit()}>
                    Save
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    color='error'
                    variant="contained"
                    onClick={goBack}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Container>
      </div>
    </div>

  )
}

export default UpdateAC;
