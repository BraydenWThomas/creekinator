import React from 'react';
import fdm from './fdm-logo.png';
import { Tabs, Tab } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TuneIcon from '@mui/icons-material/Tune';
import './NavBar.css';

const NavBar = () => {
    //Logo should link back to dashboard to corresponding user
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
                sx={{minWidth: '120%'}}
                onChange={handleChange}>
                    <Tab label={<><DashboardIcon /> Dashboard</>} style={{ flexDirection:'row', padding:'10%'}} />
                    <Tab label={<><CalendarMonthIcon /> Calendar</>} style={{flexDirection:'row', padding:'10%'}} />
                    <Tab label={<><TuneIcon /> Settings</>} style={{flexDirection:'row', padding:'10%'}} />
                </Tabs>
            </nav>
        </div>
    );
};

export default NavBar;
