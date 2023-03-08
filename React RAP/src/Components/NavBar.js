import React from 'react';
import fdm from './fdm-logo.png';
import { Tabs, Tab } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TuneIcon from '@mui/icons-material/Tune';
import './NavBar.css';

const NavBar = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="nav-container">
            <nav className="nav-side">
                <img src={fdm} alt="FDM Logo" />
                <Tabs className='nav-links' 
                orientation="vertical" 
                variant="scrollable" 
                value={value} 
                onChange={handleChange}>
                    <Tab label={<><DashboardIcon /> Dashboard</>} style={{flexDirection:'row'}} />
                    <Tab label={<><CalendarMonthIcon /> Calendar</>} style={{flexDirection:'row'}} />
                    <Tab label={<><TuneIcon /> Settings</>} style={{flexDirection:'row'}} />
                </Tabs>
            </nav>
        </div>
    );
};

export default NavBar;
