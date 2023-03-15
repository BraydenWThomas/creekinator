import React, { Fragment, useState } from 'react';
import fdm from './fdm-logo.png';
import { Tabs, Tab, Paper, Button, } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TuneIcon from '@mui/icons-material/Tune';
import LogoutIcon from '@mui/icons-material/Logout';
import './Styling/NavBar.css';


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
      <Paper elevation={4} sx={{ height: '100vh'}}>
        <nav className="nav-side">
          <img src={fdm} alt="FDM Logo"/>
        </nav>
        <Tabs component="nav" orientation='vertical' variant='scrollable' sx={{ mt: 2 }} value={value} onChange={handleChange}
          TabIndicatorProps={{ sx: { left: 0, width: 7 } }}>
          <Tab
            icon={<DashboardIcon />}  iconPosition="start"
            label="Dashboard"
          />
          <Tab
            icon={<CalendarMonthIcon />} iconPosition="start"
            href='/calendar'
            label="Calendar"
          />
          <Tab
            icon={<TuneIcon />} iconPosition="start"
            label="Settings"
          />
          <Tab
          icon={<LogoutIcon />} iconPosition="start"
          label="Logout"
          onClick={logout}
          sx={{ mt: 105 }}
          />
        </Tabs>
      </Paper>
    </div>
  );
};

export default NavBar;
