import React, { Fragment, useState } from 'react';
import fdm from './fdm-logo.png';
import { Tabs, Tab, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TuneIcon from '@mui/icons-material/Tune';
import './Styling/NavBar.css';


const NavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="nav-container">
        <nav className="nav-side">
          <img src={fdm} alt="FDM Logo" />
        </nav>
        <Tabs component="nav" orientation='vertical' variant='scrollable' value={value} onChange={handleChange}
          TabIndicatorProps={{ sx: { left: 0, width: 5 } }}>
          <Tab
            icon={<DashboardIcon />} sx={{ m: 1 }} iconPosition="start"
            label="Dashboard"
          />
          <Tab
            icon={<CalendarMonthIcon />} iconPosition="start"
            label="Calendar"
          />
          <Tab
            icon={<TuneIcon />} iconPosition="start"
            label="Settings"
          />
        </Tabs>
    </div>
  );
};

export default NavBar;
