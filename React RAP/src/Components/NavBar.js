import React, { Fragment, useState } from 'react';
import fdm from './fdm-logo.png';
import { Tabs, Tab, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TuneIcon from '@mui/icons-material/Tune';
import './NavBar.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';


const FDMtheme = createTheme({
  palette: {
    primary: {
      main: '#6f00ff',
    },
    secondary: blue,
  },
});

const NavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mainListItems = (
    <Fragment>
      <ListItemButton onClick={() => setValue(0)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => setValue(1)}>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItemButton>
      <ListItemButton onClick={() => setValue(2)}>
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </Fragment>
  );

  return (
    <div className="nav-container">
      <ThemeProvider theme={FDMtheme}>
        <nav className="nav-side">
          <img src={fdm} alt="FDM Logo" />
          {/* <Tabs className='nav-links'
          orientation="vertical"
          variant="scrollable"
          value={value}
          sx={{ minWidth: '120%' }}
          onChange={handleChange}>
          <Tab label={<><DashboardIcon /> Dashboard</>} />
          <Tab label={<><CalendarMonthIcon /> Calendar</>} />
          <Tab label={<><TuneIcon /> Settings</>} style={{ />
        </Tabs> */}
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
      </ThemeProvider>
    </div>
  );
};

export default NavBar;
