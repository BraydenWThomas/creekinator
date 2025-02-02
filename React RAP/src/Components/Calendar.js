// React + css
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import '../Styling/RecruiterStyles.css';

// Components
import CandidateSelectBox from './Candidate/CandidatesSelectBox';
import AssessmentCentreInfo from './Recruiters/AssessmentCentreInfo';
import NavBar from './NavBar';

// Material UI
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import Button from '@mui/material/Button';
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Calendar = () => {

  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const longerMonth = ["Jan", "March", "May", "Jul", "Aug", "Oct", "Dec"] // Specifically months

  const [displayMonth, setDisplayMonth] = useState(monthList[0]);
  const [displayDay, setDisplayDay] = useState(1);
  const [acCenters, setACCenters] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [pack, setPack] = useState("1");
  const [title, setTitle] = useState("");
  const changeMonthDisplay = (value) => {
    setDisplayMonth(value);
    setDisplayDay(1);

  }
  const changeDayDisplay = (value) => {
    setDisplayDay(value)
    setTitle("")
  }

  // Get AC Details
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      redirect: 'follow'
    };

    fetch("http://localhost:8080/api/ac", requestOptions)
      .then(response => response.json())
      .then(result => setACCenters(result))
      .catch(error => console.log('error', error));
  }, []);

  // Show AC dates
  useEffect(() => {
    var day = "";
    var month = "";
    var id = 0;
    for (var i = 0; i < acCenters.length; i++) {
      month = acCenters[i].date.substring(5, 7)
      day = acCenters[i].date.substring(8, 10)
      id = acCenters[i].coordinatorId

      console.log(localStorage.getItem('userId'))
      console.log(acCenters[i].coordinator_id)

      if (id == localStorage.getItem('userId')) {
        if (monthList[parseInt(month) - 1] == displayMonth && parseInt(day) == displayDay) {
          setStartTime(acCenters[i].start_time)
          setEndTime(acCenters[i].finish_time)
          setTitle(acCenters[i].title)
        }
      }
    }
  }, [displayDay]);

  const mapDaysToMonth = (value) => {
    var dayslist = []
    if (value == "Feb") {
      for (var i = 1; i <= 28; i++) {
        dayslist.push(i)
      }
    }

    else if (value in longerMonth) {
      for (var i = 1; i <= 31; i++) {
        dayslist.push(i)
      }
    }

    else {
      for (var i = 1; i <= 30; i++) {
        dayslist.push(i)
      }
    }

    return dayslist
  }
  
  const showToday = () => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth();
    changeMonthDisplay(monthList[month])
    changeDayDisplay(date)
  }

  return (
    <div className="pageSection" style={{display:'flex'}}>

      <NavBar />

      <div className="content" style={{ float: 'left', width: '85%', paddingLeft:20, paddingRight:20 }}>
        <div className="header" style={{ display: "flex" }}>
        <Typography component="h1" variant="h3" mt={2} sx={{ flex: 1 }}> Calendar </Typography>
          <div className="right-header" style={{ display: 'flex', paddingRight: "2%", paddingTop: "1%" }}>
            <NotificationsIcon fontSize="large" />
            <Avatar src="/broken-image.jpg" />
          </div>
        </div>
        <Divider />
        <div className="monthsToolBar">
          <Box display="flex"
            justifyContent="center"
            alignItems="center">
            <Tabs value={displayMonth}
              variant="scrollable"
              aria-label="basic tabs example">
              {monthList.map((months, index) => (
                <Tab value={months} label={months} key={index} onClick={() => changeMonthDisplay(months)} />
              ))}

            </Tabs>
          </Box>
        </div>
        <Divider />
        <div className="daysToolBar" >
          <Box display="flex"
            justifyContent="center"
            alignItems="center">
            <Tabs
              variant="scrollable"
              aria-label="scrollable auto tabs example"
              value={displayDay}
            >
              {mapDaysToMonth(displayMonth).map((days, index) => (
                <Tab value={days} label={days} key={index} onClick={() => changeDayDisplay(days)} />
              ))}
            </Tabs>
          </Box>
        </div>

        <Divider />

        <div>
          <Button onClick={showToday} variant="contained" component="label" sx={{ m: 5 }}><TodayIcon />Today</Button>
        </div>

        <div className="ACinfo">
          {title !== "" ?
            <Box
              sx={{
                display: 'flex',
                minWidth: 500,
                '& > :not(style)': {
                  m: 1,
                  width: '100%',
                  height: 300
                },
                backgroundColor: 'white',
                borderRadius: '10px'
              }}>
              <TableContainer>
                <Table aria-label="Users table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan="4" style={{ textAlign: 'center', fontWeight: 'bold' }}>{title}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    <TableRow>
                      <TableCell>Start Time</TableCell>
                      <TableCell>End Time</TableCell>
                      <TableCell>Interview Pack</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{startTime}</TableCell>
                      <TableCell>{endTime}</TableCell>
                      <TableCell>{pack}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid item xs sm={12}>
                <Link to={`/recruiter/ac/view-upcoming/${acCenters.id}`}>
                  <Button
                    fullWidth
                    color='secondary'
                    variant="contained">
                    View AC
                  </Button>
                </Link>
              </Grid>
            </Box> : <p></p>}   
        </div>
      </div>
    </div >

  )
}


export default Calendar;
