// React + css
import React, { Fragment, useState } from 'react';
import fdm from './fdm-logo.png';
import './Styling/NavBar.css';

// Material UI
import { Tabs, Tab, Paper, Button, } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logout = () => {
    localStorage.removeItem('status');
    localStorage.removeItem('userId')
    window.location.href = "/"
  }

  return (
    <div className="nav-container">
      <Paper elevation={4} sx={{ height: '100vh' }}>
        <nav className="nav-side">
          <img src={fdm} alt="FDM Logo" />
        </nav>
        <Tabs component="nav" orientation='vertical' variant='scrollable' sx={{ mt: 2 }} value={value} onChange={handleChange}
          TabIndicatorProps={{ sx: { left: 0, width: 7 } }}>
          {localStorage.getItem("status") === "ROLE_RECRUITER"
            ? // If recruiter user is logged onto system
            <>
              <Tab
                icon={<DashboardIcon />} iconPosition="start"
                href='/recruiter'
                label="Dashboard"
              />
              <Tab
                icon={<CalendarMonthIcon />} iconPosition="start"
                href='/recruiter/calendar'
                label="Calendar"
              />
            </>
            : // If interviewer user is logged onto system  
            (localStorage.getItem("status") === "ROLE_INTERVIEWER"
              ? <>
                  <Tab
                    icon={<DashboardIcon />} iconPosition="start"
                    href='/interviewer'
                    label="Dashboard"
                  />
                  <Tab
                    icon={<CalendarMonthIcon />} iconPosition="start"
                    href='/interviewer/calendar'
                    label="Calendar"
                  />
                </>  
              : // If candidate user is logged onto system  
              (localStorage.getItem("status") === "ROLE_CANDIDATE"
                ? <>
                    <Tab
                      icon={<DashboardIcon />} iconPosition="start"
                      href='/candidate'
                      label="Dashboard"
                    />
                    <Tab
                      icon={<CalendarMonthIcon />} iconPosition="start"
                      href='/candidate/calendar'
                      label="Calendar"
                    />
                  </>
                : <></>
              )
            )
          }
          <Tab
            icon={<LogoutIcon />} iconPosition="start"
            label="Logout"
            onClick={logout}
            sx={{ mt: 115 }}
          />
        </Tabs>
      </Paper>
    </div>
  );
};

export default NavBar;
